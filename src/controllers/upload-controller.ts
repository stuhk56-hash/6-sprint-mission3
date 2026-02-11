// uploadController

import type { Request, Response } from 'express'

export const imageUpload = (req: Request, res: Response) => {
  if (!req.file) { 
    return res.status(400).json({
      message: 'No file uploaded',
    })
  } else {
    return res.status(200).json({
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename
      }
    })
  }
}
    

