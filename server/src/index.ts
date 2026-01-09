import express, { type Request, type Response } from 'express';
import cors from 'cors';
import QRCode from 'qrcode';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function validateUpiId(upiId: string): { valid: boolean; error?: string } {
  if (!upiId || upiId.trim() === '') {
    return { valid: false, error: 'UPI ID is required' };
  }

  const parts = upiId.split('@');
  
  if (parts.length !== 2) {
    return { valid: false, error: 'UPI ID must contain exactly one @' };
  }

  const [username, handle] = parts;

  // Check if username or handle is undefined
  if (!username || !handle) {
    return { valid: false, error: 'Invalid UPI ID format' };
  }

  if (username.length < 3 || username.length > 256) {
    return { valid: false, error: 'Username must be 3-256 characters' };
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
    return { valid: false, error: 'Invalid characters in username' };
  }

  if (handle.length < 2 || handle.length > 50) {
    return { valid: false, error: 'Bank handle must be 2-50 characters' };
  }

  if (!/^[a-zA-Z]+$/.test(handle)) {
    return { valid: false, error: 'Bank handle can only contain letters' };
  }

  return { valid: true };
}

// Validate UPI ID
app.post('/api/validate-upi', (req: Request, res: Response) => {
  const { upiId } = req.body;
  
  if (!upiId) {
    return res.status(400).json({ 
      valid: false, 
      error: 'UPI ID is required' 
    });
  }

  const validation = validateUpiId(upiId);
  
  if (!validation.valid) {
    return res.json({
      valid: false,
      error: validation.error
    });
  }

  res.json({
    valid: true,
    upiId: upiId,
    message: 'Valid UPI ID format'
  });
});

// Generate QR Code
app.post('/api/generate-qr', async (req: Request, res: Response) => {
  try {
    const { upiId, name } = req.body;

    // Validate UPI ID first
    if (!upiId) {
      return res.status(400).json({
        success: false,
        error: 'UPI ID is required'
      });
    }

    const validation = validateUpiId(upiId);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error
      });
    }

    // Build UPI string
    let upiString = `upi://pay?pa=${encodeURIComponent(upiId)}`;
    if (name) upiString += `&pn=${encodeURIComponent(name)}`;
    upiString += `&cu=INR`;

    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(upiString, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    res.json({
      success: true,
      qrCode: qrCodeDataURL,
      upiString: upiString,
      details: {
        upiId,
        name: name || null,
      }
    });

  } catch (error) {
    console.error('QR Generation Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate QR code' 
    });
  }
});

const PORT = 3000   
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});