import React, { useEffect, useState } from "react";
import SuratPengajuanCuti from "./pdf/SuratPengajuanCuti";
import { BlobProvider } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
import { IoPrintOutline, IoDownloadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const DetailPengajuanCuti = () => {
  const { state } = useLocation();
  const { user } = useSelector((state) => state.auth);
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

  return (
    <div className="bg-gray-100 min-h-screen font-Poppins my-auto">
      <h1 className="text-3xl font-bold text-center mb-8 pt-8 mt-8">
        Detail Pengajuan Cuti
      </h1>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <table className="w-full mt-4">
            <tbody>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">Nama</td>
                <td className="text-lg font-normal">: {user && user.name}</td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">NIP</td>
                <td className="text-lg font-normal">: {user && user.nip}</td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">No Surat</td>
                <td className="text-lg font-normal">: {formData.noSurat}</td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">Tanggal Surat</td>
                <td className="text-lg font-normal">: {formData.tglSurat}</td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">Jabatan</td>
                <td className="text-lg font-normal">: {formData.jabatan}</td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">Masa kerja</td>
                <td className="text-lg font-normal">: {formData.masaKerja}</td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">Alamat lengkap</td>
                <td className="text-lg font-normal">
                  : {formData.alamatLengkap}
                </td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">No Telpon</td>
                <td className="text-lg font-normal">: {formData.noTelpon}</td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">Jenis Cuti</td>
                <td className="text-lg font-normal">: {formData.leaveType}</td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">Alasan Cuti</td>
                <td className="text-lg font-normal">: {formData.message}</td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">
                  Lamanya Cuti (Hari)
                </td>
                <td className="text-lg font-normal">: {formData.leaveDays}</td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">Tanggal Mulai</td>
                <td className="text-lg font-normal">
                  : {formatDate(formData.startDate)}
                </td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">Tanggal Selesai</td>
                <td className="text-lg font-normal">
                  : {formatDate(formData.endDate)}
                </td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">
                  Sisa Cuti Tahunan (N)
                </td>
                <td className="text-lg font-normal">
                  : {user && user.sisacuti}
                </td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">
                  Sisa Cuti (N - 1)
                </td>
                <td className="text-lg font-normal">
                  : {user && user.sisacutiN1}
                </td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">
                  Sisa Cuti (N - 2)
                </td>
                <td className="text-lg font-normal">
                  : {user && user.sisacutiN2}
                </td>
              </tr>
              <tr className="mb-2">
                <td className="text-lg font-semibold pl-20">
                  Sisa Cuti Bersama
                </td>
                <td className="text-lg font-normal">
                  : {user && user.cutiBersama}
                </td>
              </tr>
            </tbody>
          </table>

          <BlobProvider
            document={
              <SuratPengajuanCuti formData={{ ...formData }} user={user} />
            }
          >
            {({ blob, url }) => (
              <div className="flex justify-center space-x-4 mt-8 mb-4">
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
                    saveAs(
                      blob,
                      `Surat Pengajuan Cuti - ${user && user.name}.pdf`
                    );
                  }}
                >
                  <IoDownloadOutline className="w-5 h-5 mr-1" /> Download PDF
                </button>
              </div>
            )}
          </BlobProvider>
        </div>
      </div>
    </div>
  );
};

export default DetailPengajuanCuti;
