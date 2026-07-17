const pdfParse = require("pdf-parse");

const interviewReportModel = require('../models/interviewReportModel');
const { generateInterviewReport } = require('../services/aiServices');

const generateInterviewReportController = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file uploaded or file buffer is missing." });
    }

    // 1. Parse the PDF buffer safely
    const parsedPdf = await (new pdfParse.PDFParse(new Uint8Array(req.file.buffer), {
      cMapUrl: 'https://jsdelivr.net',
      cMapPacked: true,
    }));

    // 2. Debug: Let's see what the parser actually outputs
    console.log("Raw parsedPdf output:", parsedPdf);

    // 3. Extract text carefully depending on whether parsedPdf is a string or an object
    let resumeContent = "";
    if (typeof parsedPdf === 'string') {
      resumeContent = parsedPdf;
    } else if (parsedPdf && typeof parsedPdf.getText === 'function') {
      resumeContent = await parsedPdf.getText();
    } else {
      resumeContent = parsedPdf?.text || "Mern Developer";
    }

    const { jobDescription, selfDescription } = req.body;

    // 4. Pass it down (resumeContent is now guaranteed to be a string)
    const aiGeneratedReport = await generateInterviewReport({ 
      resume: resumeContent, 
      jobDescription, 
      selfDescription 
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      jobDescription,
      selfDescription,
      ...aiGeneratedReport
    });

    res.status(201).json({ message: "Interview report generated successfully.", interviewReport });

  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    generateInterviewReportController
};
