import React, { useState } from 'react'
import { FileUpload } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const DocumentUploader = ({ dialogVisible, setDialogVisible }) => {
  const [dialogData, setDialogData] = useState({
    title: 'Documents',
    message: '',
    severity: 'info',
  })

  const [uploadedDocs, setUploadedDocs] = useState([]) // State to store uploaded documents

  const handleUpload = event => {
    const newDocs = event.files.map(file => ({
      name: file.name,
      url: `http://localhost:4000/uploads/${file.name}`, // Assume backend returns file URL
    }))

    setUploadedDocs(prevDocs => [...prevDocs, ...newDocs])
  }

  const ActionCell = rowData => (
    <div className='flex gap-2 justify-content-center'>
      <Button
        label=''
        icon='pi pi-eye'
        severity='success'
        className='p-button-rounded'
        style={{ width: '28px', height: '28px', padding: '0' }}
        onClick={() => window.open(rowData.url, '_blank')}
      />
      <Button
        size='sm'
        label=''
        icon='pi pi-download '
        className='p-button-rounded border-none'
        style={{ width: '28px', height: '28px', padding: '0' }}
        onClick={() => {
          const a = document.createElement('a')
          a.href = rowData.url
          a.download = rowData.name
          a.click()
        }}
      />
      <Button
        label=''
        icon='pi pi-trash'
        className='p-button-rounded border-none'
        severity='danger'
        style={{ width: '28px', height: '28px', padding: '0' }}
        onClick={() => {
          const a = document.createElement('a')
          a.href = rowData.url
          a.download = rowData.name
          a.click()
        }}
      />
    </div>
  )

  return (
    <div className='document-uploader'>
      {/* PrimeReact FileUpload Component */}
      <Dialog
        header={dialogData.title}
        visible={dialogVisible}
        style={{ width: '600px' }}
        footer=''
        onHide={() => setDialogVisible(false)}>
        {uploadedDocs.length > 0 && (
          <div className='uploaded-docs'>
            <DataTable value={uploadedDocs} responsiveLayout='scroll'>
              <Column align='center' field='name' header='Document Name' />
              <Column align='center' field='createdAt' header='Upload Date' />
              <Column align='center' body={ActionCell} header='Actions' />
            </DataTable>
          </div>
        )}
        <div className='flex justify-content-center mt-3'>
        <FileUpload
          name='documents[]'
          url='http://localhost:4000/api/upload'
          multiple
          // accept='application/pdf,application/msword'
          maxFileSize={1000000}
          onUpload={handleUpload}
          chooseLabel='Add Document'
          uploadLabel='Upload'
        />
        </div>
        {/* Uploaded Documents List */}
      </Dialog>
    </div>
  )
}

export default DocumentUploader
