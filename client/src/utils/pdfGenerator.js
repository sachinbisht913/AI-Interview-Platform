import jsPDF from "jspdf";

export const generateInterviewPDF = (report) => {

    const pdf = new jsPDF();

    let y = 20;

    const interview = report[0];

    const writeText = (title, text) => {

        pdf.setFont(undefined, "bold");
        pdf.text(title, 20, y);

        y += 7;

        pdf.setFont(undefined, "normal");

        const lines = pdf.splitTextToSize(
            text || "-",
            170
        );

        pdf.text(lines, 20, y);

        y += lines.length * 7 + 8;

        if (y > 270) {
            pdf.addPage();
            y = 20;
        }
    };

    pdf.setFontSize(22);
    pdf.text("AI Interview Platform", 20, y);

    y += 10;

    pdf.setFontSize(16);
    pdf.text("Interview Report", 20, y);

    y += 15;

    pdf.setFontSize(12);

    pdf.text(`Domain: ${interview.domain}`, 20, y);
    y += 8;

    pdf.text(`Difficulty: ${interview.difficulty}`, 20, y);
    y += 8;

    pdf.text(
        `Overall Score: ${interview.overall_score}/10`,
        20,
        y
    );

    y += 15;

    writeText(
        "Overall Feedback",
        interview.overall_feedback
    );

    report.forEach((item, index) => {

        if (y > 240) {
            pdf.addPage();
            y = 20;
        }

        pdf.setFontSize(15);

        pdf.text(
            `Question ${index + 1}`,
            20,
            y
        );

        y += 10;

        writeText("Topic", item.topic);

        writeText("Question", item.question);

        writeText(
            "Expected Answer",
            item.expected_answer
        );

        writeText(
            "Your Answer",
            item.user_answer
        );

        writeText(
            "AI Feedback",
            item.feedback
        );

        pdf.setFont(undefined, "bold");
        pdf.text(
            `Score : ${item.score}/10`,
            20,
            y
        );

        y += 15;

    });

    pdf.save(
        `Interview_Report_${interview.domain}.pdf`
    );

};