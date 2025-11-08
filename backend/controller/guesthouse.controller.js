import GuestHouseRequest from "../models/guesthouse.model.js";
import cloudinary from "cloudinary";
import PDFDocument from "pdfkit";
import streamifier from "streamifier";

// =============================
// Create new Guest House request
// =============================
export const createGuestHouseRequest = async (req, res) => {
  try {
    const { name, email, phone, fromDate, toDate, purpose, numberOfGuests } =
      req.body;

    const documents = [];

    // Handle uploaded files
    if (req.files && req.files.documents) {
      const uploadedFiles = Array.isArray(req.files.documents)
        ? req.files.documents
        : [req.files.documents];

      for (const file of uploadedFiles) {
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
          folder: "guesthouse_documents",
        });

        documents.push({
          public_id: result.public_id,
          url: result.secure_url,
          fileType: file.mimetype,
        });
      }
    }

    const newRequest = await GuestHouseRequest.create({
      user: req.user._id,
      name,
      email,
      phone,
      fromDate,
      toDate,
      purpose,
      numberOfGuests,
      documents,
    });

    res.status(201).json({
      success: true,
      message: "Guest House request submitted successfully!",
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===================================
// Get all requests (for admins/institute)
// ===================================
export const getAllRequests = async (req, res) => {
  try {
    const requests = await GuestHouseRequest.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===================================
// Get user's own requests
// ===================================
export const getUserRequests = async (req, res) => {
  try {
    const requests = await GuestHouseRequest.find({ user: req.user._id });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===================================
// Update request status (Institute/Registrar)
// ===================================
export const updateRequestStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const request = await GuestHouseRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    if (status === "Institute Verified") request.instituteRemarks = remarks;
    if (status === "Registrar Approved") {
      request.registrarRemarks = remarks;

      // Generate Permission Letter PDF and upload to Cloudinary
      const doc = new PDFDocument();
      let pdfBuffer = [];
      doc.on("data", (chunk) => pdfBuffer.push(chunk));
      doc.on("end", async () => {
        const pdfData = Buffer.concat(pdfBuffer);

        // Upload PDF to Cloudinary
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "guesthouse_letters", resource_type: "raw" },
          async (error, result) => {
            if (error) throw new Error(error.message);
            request.permissionLetter = result.secure_url;
            request.status = status;
            await request.save();
            res.json({
              success: true,
              message: "Request updated and letter generated!",
              data: request,
            });
          }
        );

        streamifier.createReadStream(pdfData).pipe(uploadStream);
      });

      // Content of the PDF
      doc.fontSize(18).text("Guest House Booking Permission Letter", {
        align: "center",
      });
      doc.moveDown();
      doc.fontSize(14).text(`Approved for: ${request.name}`);
      doc.text(
        `Duration: ${request.fromDate.toDateString()} to ${request.toDate.toDateString()}`
      );
      doc.text(`Purpose: ${request.purpose}`);
      doc.text(`Approved by: Registrar`);
      doc.end();
    } else {
      request.status = status;
      await request.save();
      res.json({
        success: true,
        message: "Request status updated!",
        data: request,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
