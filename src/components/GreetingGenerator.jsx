// import React, { useRef, useState, useEffect } from "react";
// import image from '../../public/eid_image.jpg';

// const GreetingGenerator = () => {
//   const canvasRef = useRef(null);
//   const [name, setName] = useState("");
//   const [eidImage, setEidImage] = useState(null);

//   useEffect(() => {
//     const img = new Image();
//     img.src = image; // loads from public folder
//     img.onload = () => setEidImage(img);
//   }, []);

//   const drawImageWithText = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || !eidImage) return;
//     const ctx = canvas.getContext("2d");

//     // Clear canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw the Eid image
//     ctx.drawImage(eidImage, 0, 0, canvas.width, canvas.height);

//     // Draw the name text
//     if (name.trim() !== "") {
//       ctx.font = "bold 48px Arial";
//       ctx.fillStyle = "black";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "bottom";

//       // Position: bottom center, 100 px above bottom
//       ctx.fillText(name, canvas.width / 2, canvas.height - 100);
//     }
//   };

//   const handleDownload = () => {
//     drawImageWithText();

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const link = document.createElement("a");
//     link.download = `eid-greeting-${name || "guest"}.png`;
//     link.href = canvas.toDataURL("image/png");
//     link.click();
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "2rem" }}>
//       <h2>Eid Greeting Generator</h2>
//       <canvas
//         ref={canvasRef}
//         width={800}
//         height={600}
//         style={{ border: "1px solid #ccc" }}
//       />
//       <div style={{ marginTop: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Enter your name (Arabic or English)"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ fontSize: "1.2rem", padding: "0.5rem", width: "300px" }}
//         />
//       </div>
//       <button
//         onClick={handleDownload}
//         style={{
//           marginTop: "1rem",
//           padding: "0.7rem 1.5rem",
//           fontSize: "1.2rem",
//           cursor: "pointer",
//         }}
//       >
//         Download
//       </button>
//     </div>
//   );
// };

// export default GreetingGenerator;



import React, { useRef, useState, useEffect } from "react";

const GreetingGenerator = () => {
  const canvasRef = useRef(null);
  const [name, setName] = useState("");
  const [eidImage, setEidImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/eid_image.jpg"; // Use public folder path
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
      // Use Cairo font or fallback to Arial
      ctx.font = "bold 56px Cairo, Arial, sans-serif";

      // Create gradient fill for text
      const gradient = ctx.createLinearGradient(0, canvas.height - 150, 0, canvas.height - 50);
      gradient.addColorStop(0, "#ff9966");
      gradient.addColorStop(1, "#ff5e62");

      ctx.fillStyle = gradient;

      // Add shadow for better visibility
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 4;

      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";

      ctx.fillText(name, canvas.width / 2, canvas.height - 100);

      // Reset shadow to avoid affecting other drawings
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
        <h2 style={{ marginBottom: "20px", color: "#333" }}>🎉 Eid Greeting Generator 🎉</h2>
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
          onMouseEnter={(e) => (e.target.style.background = "linear-gradient(45deg, #ff9966, #ff5e62)")}
          onMouseLeave={(e) => (e.target.style.background = "linear-gradient(45deg, #ff5e62, #ff9966)")}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default GreetingGenerator;
