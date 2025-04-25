import React, { useState, useRef } from 'react';
import './App.css';

interface OcrResult {
  text: string;
  success: boolean;
  error?: string;
}

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar si es una imagen
      if (!file.type.match('image.*')) {
        setError('Por favor, selecciona una imagen válida');
        setSelectedFile(null);
        setImagePreview(null);
        return;
      }
      
      setSelectedFile(file);
      setError(null);
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    // Limpiar todos los estados relacionados con la imagen
    setSelectedFile(null);
    setImagePreview(null);
    setOcrResult(null);
    setError(null);
    
    // Resetear el input file usando la referencia
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Por favor, selecciona una imagen primero');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch('http://localhost:8000/upload-ocr', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Error al procesar la imagen');
      }
      
      setOcrResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la solicitud');
      setOcrResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Procesador de Recibos con OCR</h1>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-container">
          <label htmlFor="file-upload" className="file-label">
            {selectedFile ? selectedFile.name : 'Seleccionar imagen de recibo'}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            ref={fileInputRef}
          />
          
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? 'Procesando...' : 'Procesar con OCR'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="results-container">
        <div className="image-preview">
          {imagePreview ? (
            <>
              <div className="preview-header">
                <h2>Vista previa</h2>
                <button 
                  className="remove-image-button"
                  onClick={handleRemoveImage}
                  title="Quitar imagen"
                >
                  Quitar imagen ✕
                </button>
              </div>
              <div className="preview-container">
                <img src={imagePreview} alt="Vista previa del recibo" />
              </div>
            </>
          ) : (
            <div className="no-image">
              <p>No hay imagen seleccionada</p>
            </div>
          )}
        </div>
        
        <div className="ocr-results">
          {ocrResult ? (
            <>
              <h2>Texto extraído</h2>
              {ocrResult.success ? (
                ocrResult.text ? (
                  <pre className="text-result">{ocrResult.text}</pre>
                ) : (
                  <p className="no-text">No se pudo extraer texto de esta imagen</p>
                )
              ) : (
                <div className="error-message">{ocrResult.error}</div>
              )}
            </>
          ) : (
            <div className="no-results">
              <p>Aún no hay resultados. Selecciona una imagen y procésala con OCR.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;