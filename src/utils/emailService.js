import emailjs from '@emailjs/browser';
import { siteData } from '../data/site';

/**
 * Dispatches resort enquiries to mayabanvillage@gmail.com using EmailJS when
 * VITE_EMAILJS_* variables are configured, or gracefully prepares a prefilled
 * WhatsApp & email handoff so every inquiry works reliably out of the box.
 */
export async function submitResortInquiry({
  inquiryType,
  name,
  phone,
  email,
  message,
  extraFields = {},
}) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const summaryLines = [
    `Inquiry Type: ${inquiryType}`,
    `Guest Name: ${name}`,
    `Mobile Number: ${phone}`,
    `Email: ${email || 'Not provided'}`,
    ...Object.entries(extraFields)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${key}: ${value}`),
    `Message: ${message || 'Please share tariff and availability details.'}`,
  ];

  const compiledBody = summaryLines.join('\n');
  const whatsappUrl = `https://wa.me/${siteData.whatsappNumberRaw}?text=${encodeURIComponent(
    compiledBody
  )}`;
  const mailtoUrl = `mailto:${siteData.email}?subject=${encodeURIComponent(
    `[Mayaban Village Resort] ${inquiryType} from ${name}`
  )}&body=${encodeURIComponent(compiledBody)}`;

  if (serviceId && templateId && publicKey) {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: siteData.email,
        inquiry_type: inquiryType,
        from_name: name,
        from_phone: phone,
        from_email: email || 'no-reply@mayabanvillageresort.com',
        message: compiledBody,
        ...extraFields,
      },
      { publicKey }
    );
    return { mode: 'emailjs', whatsappUrl, mailtoUrl };
  }

  // Graceful direct-dispatch fallback when EmailJS keys are not yet configured
  return { mode: 'direct', whatsappUrl, mailtoUrl };
}
