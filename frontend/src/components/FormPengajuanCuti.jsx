import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FormPengajuanCuti = ({ setFormData }) => {
  const { unitKerja } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const jumlahCutiTahunan = user && user.sisacuti;
  const N1 = user && user.sisacutiN1;
  const N2 = user && user.sisacutiN2;
  const [formData, setLocalFormData] = useState({
    nama: user && user.name,
    unitKerja: decodeURIComponent(unitKerja),
    jumlahCutiTahunan: jumlahCutiTahunan,
    noSurat: "",
    leaveType: "",
    message: "",
    leaveDays: "",
    startDate: "",
    endDate: "",
    jabatan: "",
    nip: "",
    cutiBersama: "",
    masaKerja: "",
    alamatLengkap: "",
    noTelpon: "",
    tglSurat: "",
    confirm: false,
  });

  const updateSisaCuti = async (userId, N, N1, N2, cutiBersama) => {
    try {
      await axios.patch(`http://localhost:5000/users-cuti/${userId}`, {
        name: user && user.name,
        nip: user && user.nip,
        sisacuti: N,
        sisacutiN1: N1,
        sisacutiN2: N2,
        cutiBersama: cutiBersama,
      });
    } catch (error) {
      console.error("Failed to update sisa cuti:", error);
    }
  };

  // Daftar tanggal merah atau hari libur
  const tanggalMerah = [
    // 2024
    // Juni
    "2024-06-17",
    "2024-06-18",
    // Juli
    "2024-07-07",
    // Agustus
    "2024-08-17",
    "2024-08-18",
    // September
    "2024-09-16",
    // Desember
    "2024-12-25",
    "2024-12-26",

    // 2025
    // Januari
    "2025-01-01", // Tahun Baru Masehi
    "2025-01-27", // Isra Mi'raj Nabi Muhammad SAW
    "2025-01-29", // Tahun Baru Imlek

    // Maret
    "2025-03-29", // Hari Raya Nyepi
    "2025-03-31", // Hari Raya Idul Fitri

    // April
    "2025-04-01", // Cuti Bersama Lebaran
    "2025-04-18", // Jumat Agung

    // Mei
    "2025-05-01", // Hari Buruh Internasional
    "2025-05-12", // Hari Raya Waisak
    "2025-05-29", // Kenaikan Isa Almasih

    // Juni
    "2025-06-01", // Hari Lahir Pancasila
    "2025-06-07", // Hari Raya Idul Adha
    "2025-06-27", // Tahun Baru Islam

    // Agustus
    "2025-08-17", // Hari Kemerdekaan RI

    // September
    "2025-09-05", // Maulid Nabi Muhammad SAW

    // Desember
    "2025-12-25", // Hari Raya Natal
    "2025-12-26", // Cuti Bersama Natal
  ];

  const [editableLeaveDays, setEditableLeaveDays] = useState("");
  const [editableEndDate, setEditableEndDate] = useState("");

  useEffect(() => {
    setEditableLeaveDays(formData.leaveDays);
    setEditableEndDate(formData.endDate);
  }, [formData.leaveDays, formData.endDate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "startDate" || name === "endDate") {
      const startDate =
        name === "startDate" ? new Date(value) : new Date(formData.startDate);
      const endDate =
        name === "endDate" ? new Date(value) : new Date(formData.endDate);
      if (endDate < startDate) {
        alert("Tanggal selesai tidak boleh sebelum tanggal mulai");
        return;
      }
      // Menghitung jumlah hari cuti yang sebenarnya
      const actualLeaveDays = calculateActualLeaveDays(
        startDate,
        endDate,
        tanggalMerah
      );
      setLocalFormData({
        ...formData,
        [name]: value,
        leaveDays: actualLeaveDays.toString(),
      });
      setEditableLeaveDays(actualLeaveDays.toString());
      setEditableEndDate(value);
    } else {
      setLocalFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Fungsi utilitas untuk menghitung jumlah hari cuti yang sebenarnya
  const calculateActualLeaveDays = (startDate, endDate, tanggalMerah) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (
        d.getDay() !== 0 && // Minggu
        d.getDay() !== 6 && // Sabtu
        !tanggalMerah.includes(d.toISOString().split("T")[0])
      ) {
        count++;
      }
    }
    return count;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.noSurat &&
      formData.leaveType &&
      formData.message &&
      formData.leaveDays &&
      formData.startDate &&
      formData.endDate &&
      formData.confirm &&
      formData.jabatan &&
      formData.masaKerja &&
      formData.alamatLengkap &&
      formData.tglSurat &&
      formData.noTelpon
    ) {
      let newRemainingAnnualLeave = jumlahCutiTahunan;
      let newN1 = N1;
      let newN2 = N2;
      let cutiBersama = user && user.cutiBersama;
      let lamanyacuti = parseInt(formData.leaveDays);

      if (formData.leaveType === "Cuti Tahunan") {
        // Prioritas pertama: Cuti Bersama
        if (cutiBersama > 0) {
          if (cutiBersama >= lamanyacuti) {
            cutiBersama -= lamanyacuti;
            lamanyacuti = 0;
          } else {
            lamanyacuti -= cutiBersama;
            cutiBersama = 0;
          }
        }

        // Prioritas kedua: Cuti Dua Tahun Lalu (N-2)
        if (lamanyacuti > 0 && newN2 > 0) {
          if (newN2 >= lamanyacuti) {
            newN2 -= lamanyacuti;
            lamanyacuti = 0;
          } else {
            lamanyacuti -= newN2;
            newN2 = 0;
          }
        }

        // Prioritas ketiga: Cuti Satu Tahun Lalu (N-1)
        if (lamanyacuti > 0 && newN1 > 0) {
          if (newN1 >= lamanyacuti) {
            newN1 -= lamanyacuti;
            lamanyacuti = 0;
          } else {
            lamanyacuti -= newN1;
            newN1 = 0;
          }
        }

        // Prioritas terakhir: Cuti Tahunan (Tahun Ini)
        if (lamanyacuti > 0 && newRemainingAnnualLeave > 0) {
          if (newRemainingAnnualLeave >= lamanyacuti) {
            newRemainingAnnualLeave -= lamanyacuti;
            lamanyacuti = 0;
          } else {
            lamanyacuti -= newRemainingAnnualLeave;
            newRemainingAnnualLeave = 0;
          }
        }

        if (
          lamanyacuti > 0 &&
          cutiBersama === 0 &&
          newN2 === 0 &&
          newN1 === 0 &&
          newRemainingAnnualLeave === 0
        ) {
          alert("Jumlah cuti yang diambil melebihi jumlah cuti yang tersisa.");
          return;
        }
      }

      // Update sisa cuti di database
      updateSisaCuti(
        user.uuid,
        newRemainingAnnualLeave,
        newN1,
        newN2,
        cutiBersama
      );

      // Set data form yang sudah diperbarui
      setFormData({
        ...formData,
        remainingAnnualLeave: newRemainingAnnualLeave,
        sisacutiN1: newN1,
        sisacutiN2: newN2,
        cutiBersama: cutiBersama,
      });

      navigate("/tampilkan-data-cuti", {
        state: {
          formData: {
            ...formData,
            remainingAnnualLeave: newRemainingAnnualLeave,
            sisacutiN1: newN1,
            sisacutiN2: newN2,
            cutiBersama: cutiBersama,
          },
        },
      });
    } else {
      alert("Silakan lengkapi semua field sebelum mengajukan cuti.");
    }
  };

  const handleNumericInput = (e) => {
    if (!/^\d*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center font-Poppins py-16">
      <div className="bg-white w-full md:w-3/4 lg:w-1/2 xl:w-1/3 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Form Cuti Pegawai
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-gray-700 font-medium">
            Halo <span className="font-bold text-lg">{user && user.name}</span>,
            <p>Berikut adalah rincian Cuti Tahunan Anda:</p>
            <ul className="list-disc list-inside ml-1">
              <li>
                Tahun Ini:
                <span className="font-bold text-lg ml-2">
                  {jumlahCutiTahunan} Hari
                </span>
              </li>
              <li>
                Tahun Lalu (N-1):
                <span className="font-bold text-lg ml-2">
                  {user && user.sisacutiN1} Hari
                </span>
              </li>
              <li>
                Dua Tahun Lalu (N-2):
                <span className="font-bold text-lg ml-2">
                  {user && user.sisacutiN2} Hari
                </span>
              </li>
              <li>
                Cuti Bersama:
                <span className="font-bold text-lg ml-2">
                  {user && user.cutiBersama} Hari
                </span>
              </li>
            </ul>
            <p>
              Jadi, total Cuti Tahunan yang dapat Anda nikmati adalah:
              <span className="font-bold text-lg ml-2">
                {jumlahCutiTahunan +
                  (user ? user.sisacutiN1 : 0) +
                  (user ? user.sisacutiN2 : 0) +
                  (user ? user.cutiBersama : 0)}{" "}
                Hari
              </span>
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="jabatan"
              className="block text-gray-700 font-medium mb-2"
            >
              Nomor Surat
            </label>
            <input
              type="text"
              id="noSurat"
              name="noSurat"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              value={formData.noSurat}
              onChange={handleChange}
              placeholder="Masukkan Nomor Surat Anda"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="jabatan"
              className="block text-gray-700 font-medium mb-2"
            >
              Jabatan
            </label>
            <input
              type="text"
              id="jabatan"
              name="jabatan"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              value={formData.jabatan}
              onChange={handleChange}
              placeholder="Masukkan Jabatan Anda"
              required
            />
          </div>

          {/* Tanggal Surat */}
          <div className="mb-4">
            <label
              htmlFor="tglSurat"
              className="block text-gray-700 font-medium mb-2"
            >
              Tanggal Surat
            </label>
            <input
              type="date"
              id="tglSurat"
              name="tglSurat"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              value={formData.tglSurat}
              onChange={handleChange}
              placeholder="Masukkan Tanggal Surat Anda"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="masaKerja"
              className="block text-gray-700 font-medium mb-2"
            >
              Masa Kerja
            </label>
            <input
              type="text"
              id="masaKerja"
              name="masaKerja"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              value={formData.masaKerja}
              onChange={handleChange}
              placeholder="Masukkan Masa Kerja Anda"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="alamatLengkap"
              className="block text-gray-700 font-medium mb-2"
            >
              Alamat Lengkap
            </label>
            <textarea
              id="alamatLengkap"
              name="alamatLengkap"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              rows="2"
              value={formData.alamatLengkap}
              onChange={handleChange}
              placeholder="Masukkan Alamat Lengkap Anda"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="noTelpon"
              className="block text-gray-700 font-medium mb-2"
            >
              No Telpon
            </label>
            <input
              type="text"
              id="noTelpon"
              name="noTelpon"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              value={formData.noTelpon}
              onChange={handleChange}
              pattern="\d*"
              onKeyPress={handleNumericInput}
              placeholder="Masukkan Nomor Telepon Anda"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="leaveType"
              className="block text-gray-700 font-medium mb-2"
            >
              Jenis Cuti yang diambil
            </label>
            <select
              id="leaveType"
              name="leaveType"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              value={formData.leaveType}
              onChange={handleChange}
              required
            >
              <option value="" disabled className="text-gray-400">
                Silahkan Pilih Jenis Cuti
              </option>
              <option value="Cuti Tahunan">Cuti Tahunan</option>
              <option value="Cuti Besar">Cuti Besar</option>
              <option value="Cuti Sakit">Cuti Sakit</option>
              <option value="Cuti Melahirkan">Cuti Melahirkan</option>
              <option value="Cuti Karena Alasan Penting">
                Cuti Karena Alasan Penting
              </option>
              <option value="Cuti di Luar Tanggungan Negara">
                Cuti di Luar Tanggungan Negara
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Alasan Cuti
            </label>
            <textarea
              id="message"
              name="message"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              rows="2"
              value={formData.message}
              onChange={handleChange}
              placeholder="Masukkan Alasan Cuti Anda"
              required
            ></textarea>
          </div>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-gray-700 font-medium mb-2"
              >
                Tanggal Mulai
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-gray-700 font-medium mb-2"
              >
                Tanggal Selesai
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                min={formData.startDate}
                value={editableEndDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="leaveDays"
              className="block text-gray-700 font-medium mb-2"
            >
              Lamanya Cuti (Hari)
            </label>
            <input
              type="text"
              id="leaveDays"
              name="leaveDays"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              value={editableLeaveDays}
              onChange={(e) => setEditableLeaveDays(e.target.value)}
              placeholder="Sesuaikan Lama Cuti jika diperlukan"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Apakah Anda sudah mengisi data di atas dengan benar?
            </label>
            <input
              type="checkbox"
              id="confirm"
              name="confirm"
              className="mr-2 leading-tight"
              checked={formData.confirm}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirm" className="text-gray-700">
              Ya
            </label>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPengajuanCuti;
