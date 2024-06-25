import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const FormPengajuanCuti = ({ setFormData }) => {
  const { unitKerja } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const jumlahCutiTahunan = user && user.sisacuti;

  // Daftar tanggal merah atau hari libur
  const tanggalMerah = [
    //Juni
    "2024-06-17",
    "2024-06-18",
    //Juli
    "2024-07-07",
    //Agustus
    "2024-08-17",
    "2024-08-18",
    //September
    "2024-09-16",
    //Desember
    "2024-12-25",
    "2024-12-26",
  ];

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
    masaKerja: "",
    alamatLengkap: "",
    noTelpon: "",
    tglSurat: "",
    confirm: false,
  });

  const [remainingAnnualLeave, setRemainingAnnualLeave] =
    useState(jumlahCutiTahunan);
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

    // Loop melalui setiap hari di rentang tanggal
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      // Periksa apakah hari tersebut bukan hari libur
      if (
        d.getDay() !== 0 && // Minggu
        d.getDay() !== 6 && // Sabtu
        !tanggalMerah.includes(d.toISOString().split("T")[0]) // Tanggal merah
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
      let newRemainingAnnualLeave = remainingAnnualLeave;
      if (formData.leaveType === "Cuti Tahunan") {
        newRemainingAnnualLeave =
          remainingAnnualLeave - parseInt(formData.leaveDays);
        if (newRemainingAnnualLeave < 0) {
          alert(
            "Jumlah cuti yang diambil melebihi jumlah cuti tahunan yang tersisa."
          );
          return;
        }
        setRemainingAnnualLeave(newRemainingAnnualLeave);
      }
      setFormData({
        ...formData,
        remainingAnnualLeave: newRemainingAnnualLeave,
      });
      navigate("/tampilkan-data-cuti", {
        state: {
          formData: {
            ...formData,
            remainingAnnualLeave: newRemainingAnnualLeave,
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
          Form Cuti Karyawan
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-gray-700 font-medium">
            Halo <span className="font-bold text-lg">{user && user.name}</span>
            <p>
              Jumlah Cuti Tahunan tersisa
              <span className="font-bold text-lg ml-1">
                {jumlahCutiTahunan}{" "}
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
