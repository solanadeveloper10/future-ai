// api/verifyRecaptcha.js

export default async function handler(req, res) {
  const { token } = req.body;

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: '6LcXKeIqAAAAAIeEaAV9yNx-hZAqArvnDyyF_FPa', // Replace with your secret key
      response: token
    })
  });

  const data = await response.json();

  if (data.success && data.score > 0.5) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.' });
  }
}
