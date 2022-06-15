import { toast } from 'react-toastify';

export const ToastHandler = (type, message) =>{
    if(type === "success"){
        toast.success(message, {
        position: "bottom-right",
        autoClose: 1500,
      });
    }
    else if(type === "error"){
        toast.error(message, {
        position: "bottom-right",
        autoClose: 1500,
      });
    }
    else if(type === "info"){
        toast.info(message, {
        position: "bottom-right",
        autoClose: 1500,
      });
    }
}
