import React, { useEffect, useState } from "react";
import SuratPengajuanCuti from "./pdf/SuratPengajuanCuti";
import { BlobProvider } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useLocation, useNavigate } from "react-router-dom";
import { IoPrintOutline, IoDownloadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";  

const DetailPengajuanCuti = () => {
  const { state } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData] = useState(
    state?.formData || JSON.parse(localStorage.getItem("formData"))
  );

  useEffect(() => {
    if (state?.formData) {
      localStorage.setItem("formData", JSON.stringify(state.formData));
    }
  }, [state]);

  if (!formData) {
    return <div className="text-center mt-8">No data available</div>;
  }

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleBack = () => {
    const updatedFormData = {
      ...formData,
      remainingAnnualLeave:
        formData.leaveType === "Cuti Tahunan"
          ? formData.remainingAnnualLeave - formData.leaveDays
          : formData.remainingAnnualLeave,
    };
    navigate("/", { state: { updatedFormData } });
  };

  return (
    <div className="bg-gray-100 min-h-screen font-Poppins my-auto">
      <h1 className="text-3xl font-bold text-center mb-8 pt-8 mt-8">
        Detail Pengajuan Cuti
      </h1>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          {/* Menampilkan data pengajuan cuti */}
          <p className="text-lg font-semibold mb-2">Nama:</p>
          <p className="mb-4">{user && user.name}</p>

          <p className="text-lg font-semibold mb-2">NIP:</p>
          <p className="mb-4">{user && user.nip}</p>

          <p className="text-lg font-semibold mb-2">No Surat:</p>
          <p className="mb-4">{formData.noSurat}</p>

          <p className="text-lg font-semibold mb-2">Tanggal Surat:</p>
          <p className="mb-4">{formData.tglSurat}</p>

          <p className="text-lg font-semibold mb-2">Jabatan:</p>
          <p className="mb-4">{formData.jabatan}</p>

          <p className="text-lg font-semibold mb-2">Masa kerja:</p>
          <p className="mb-4">{formData.masaKerja}</p>

          <p className="text-lg font-semibold mb-2">Alamat lengkap:</p>
          <p className="mb-4">{formData.alamatLengkap}</p>

          <p className="text-lg font-semibold mb-2">No Telpon:</p>
          <p className="mb-4">{formData.noTelpon}</p>

          <p className="text-lg font-semibold mb-2">Jenis Cuti:</p>
          <p className="mb-4">{formData.leaveType}</p>

          <p className="text-lg font-semibold mb-2">Alasan Cuti:</p>
          <p className="mb-4">{formData.message}</p>

          <p className="text-lg font-semibold mb-2">Lamanya Cuti (Hari):</p>
          <p className="mb-4">{formData.leaveDays}</p>

          <p className="text-lg font-semibold mb-2">Tanggal Mulai:</p>
          <p className="mb-4">{formatDate(formData.startDate)}</p>

          <p className="text-lg font-semibold mb-2">Tanggal Selesai:</p>
          <p className="mb-4">{formatDate(formData.endDate)}</p>

          <p className="text-lg font-semibold mb-2">Sisa Cuti Tahunan:</p>
          <p className="mb-4">{user && user.sisacuti}</p>

          {/* Tombol Print PDF dan Download PDF */}
          <BlobProvider
            document={
              <SuratPengajuanCuti formData={{ ...formData }} user={user}/>

            }
          >
            {({ blob, url }) => (
              <div className="flex justify-center space-x-4 mb-4">
                <a
                  className="flex items-center text-blue-500 hover:underline"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoPrintOutline className="w-5 h-5 mr-1" /> Print PDF
                </a>
                <button
                  className="flex items-center justify-center py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  onClick={() => {
                    saveAs(blob, `Surat Pengajuan Cuti - ${user && user.name}.pdf`);
                  }}
                >
                  <IoDownloadOutline className="w-5 h-5 mr-1" /> Download PDF
                </button>
              </div>
            )}
          </BlobProvider>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={handleBack}
          className="my-6 py-2 px-8 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default DetailPengajuanCuti;
