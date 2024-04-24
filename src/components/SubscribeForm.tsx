import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import validateEmail from "../lib/validateEmail";

const SubscribeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting");

    if (isSubmitting) return;
    setIsSubmitting(true);

    const subToast = toast.loading("Submitting...");

    const formData = new FormData(e.currentTarget);
    const formInputs = Object.fromEntries(formData);
    // console.log("formInputs:", formInputs);

    if (!formInputs?.email) {
      return toast.error("Please enter an email address", {
        id: subToast,
      });
    }

    // validate email
    if (!validateEmail((formInputs.email as String).trim())) {
      return toast.error("Please Provide a Valid email address", {
        id: subToast,
      });
    }
  };

  return (
    <form
      ref={formRef}
      className="grid gap-2 p-4 border-2"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email">Enter you Email</label>
      <input type="email" name="email" required id="email" />

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      <Toaster />
    </form>
  );
};

export default SubscribeForm;
