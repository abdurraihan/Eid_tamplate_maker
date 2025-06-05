import React, { useEffect, useRef, useState } from "react";

const GreetingGenerator1 = () => {
  const canvasRef = useRef(null);
  const [name, setName] = useState("");
  const [eidImage, setEidImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/eid_img.jpg"; // Make sure this image exists in your public folder
    img.onload = () => setEidImage(img);
  }, []);

  const drawImageWithText = () => {
    const canvas = canvasRef.current;
    if (!canvas || !eidImage) return;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the Eid image
    ctx.drawImage(eidImage, 0, 0, canvas.width, canvas.height);

    // Draw the name text
    if (name.trim() !== "") {
      ctx.font = "bold 60px 'Meow Script', cursive";

      // Solid color fill
      ctx.fillStyle = "#102e38";

      // Shadow for better readability
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 4;

      ctx.textAlign = "bottom";
      ctx.textBaseline = "bottom-right";

      // 👇 Updated: draw text with margin from top (e.g., 100px)
      ctx.fillText(` ${name}`, canvas.width / 2, 100);

      // Reset shadow
      ctx.shadowColor = "transparent";
    }
  };

  const handleDownload = () => {
    drawImageWithText();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `eid-greeting-${name || "guest"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        fontFamily: "'Cairo', Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          padding: "30px",
          maxWidth: "900px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          🎉 Eid Greeting Generator 🎉
        </h2>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Enter your name (Arabic or English)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              fontSize: "1.2rem",
              padding: "12px 16px",
              width: "80%",
              maxWidth: "400px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#ff5e62")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>
        <button
          onClick={handleDownload}
          style={{
            marginTop: "20px",
            padding: "14px 40px",
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "white",
            background: "linear-gradient(45deg, #ff5e62, #ff9966)",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 6px 15px rgba(255,94,98,0.6)",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background =
              "linear-gradient(45deg, #ff9966, #ff5e62)")
          }
          onMouseLeave={(e) =>
            (e.target.style.background =
              "linear-gradient(45deg, #ff5e62, #ff9966)")
          }
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default GreetingGenerator1;
