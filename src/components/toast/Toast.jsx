import "./Toast.css";

function Toast({ message, showToast }) {
  return (
    <div
      className={`fixed top-5 right-5 p-3 rounded shadow   text-white  ${
        message.includes("⚠️") ? "bg-red-500" : "bg-green-500"
      }
     ${showToast ? "toast show" : "toast"} `}
    >
      {message}
    </div>
  );
}

export default Toast;
