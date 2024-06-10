import React from "react";

const boxStyle = {
    disply: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#333",
    background: "#fff",
    padding: "1.5rem",
    borderRadius: ".25rem",
    fontSize: "1rem",
    lineHeight: "1.5"
}

const MessageBox = () => {
    return (
        <>
            <div style={boxStyle}>
                <span>MessageBox</span>
            </div>
        </>
    );
}

export default MessageBox;