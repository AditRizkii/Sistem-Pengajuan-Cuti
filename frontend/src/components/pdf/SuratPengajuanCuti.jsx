import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import checkmarkImage from "../../images/checkmark.png";
import axios from "axios";
import Tinos from "./Tinos-Regular.ttf";

Font.register({
  family: "Times New Roman",
  fonts: [{ src: Tinos }],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: 15,
    fontFamily: "Times New Roman",
  },
  section: {
    flexGrow: 1,
    marginBottom: 7,
  },
  anaklampiran: {
    fontSize: 8,
    textAlign: "left",
    marginBottom: 4,
    position: "absolute",
    right: 0,
  },
  address: {
    fontSize: 8,
    textAlign: "left",
    marginBottom: 4,
    marginRight: 10,
    position: "absolute",
    right: 80,
    top: 45,
  },
  title: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 5,
    paddingTop: 95,
  },
  SubHeading: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 7,
  },
  catatan: {
    fontSize: 8,
    textAlign: "start",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  catatan2: {
    fontSize: 8,
    textAlign: "start",
    marginBottom: 7,
  },
  column: {
    flexDirection: "column",
    flexBasis: "50%",
  },
  row: {
    flexDirection: "row",
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderBottomWidth: 0,
    width: "auto",
    marginBottom: 7,
  },
  tableHeader: {
    backgroundColor: "#EEE",
    padding: 2,
    fontSize: 10,
    textAlign: "left",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingLeft: 3,
  },
  tableRowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableRowLabel: {
    flexBasis: "20%",
    textAlign: "left",
    fontSize: 8,
    padding: 2,
    paddingLeft: 4,
  },
  tableRowDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#000",
  },
  tableRowValue: {
    flexBasis: "80%",
    textAlign: "left",
    fontSize: 8,
    padding: 2,
  },
  tableRowLabel2: {
    flexBasis: "80%",
    textAlign: "left",
    fontSize: 8,
    padding: 2,
    paddingLeft: 4,
  },
  tableRowValue2: {
    flexBasis: "20%",
    textAlign: "left",
    fontSize: 8,
    padding: 2,
  },
  tableRowLabel3: {
    flexBasis: "100%",
    textAlign: "left",
    fontSize: 8,
    padding: 2,
    paddingLeft: 4,
  },
  tableRowLabel4: {
    flexBasis: "40%",
    textAlign: "left",
    fontSize: 8,
    padding: 2,
    paddingLeft: 4,
  },
  tableRowValue4: {
    flexBasis: "60%",
    textAlign: "left",
    fontSize: 8,
    padding: 2,
  },
  tableRowLabel55: {
    flexBasis: "30%",
    textAlign: "left",
    fontSize: 8,
    padding: 2,
    paddingLeft: 0,
  },
  tableRowLabel5: {
    flexBasis: "30%",
    textAlign: "center",
    fontSize: 8,
    padding: 2,
    paddingLeft: 0,
  },
  tableRowValue5: {
    flexBasis: "30%",
    textAlign: "center",
    fontSize: 8,
    padding: 2,
    paddingLeft: 4,
  },
  tableRowValue55: {
    flexBasis: "40%",
    textAlign: "center",
    fontSize: 8,
    padding: 2,
  },
  tableRowLabel6: {
    flexBasis: "100%",
    textAlign: "center",
    fontSize: 8,
    padding: 2,
    paddingLeft: 4,
  },
  tableRowValue6: {
    height: 55,
    flexBasis: "100%",
    textAlign: "left",
    fontSize: 6,
    padding: 2,
    paddingLeft: 4,
  },
  tableRowValue66: {
    height: 55,
    textAlign: "center",
    justifyContent: "bottom",
    fontSize: 8,
    padding: 2,
    paddingHorizontal: 5,
    textDecoration: "underline",
  },
  tableRowContainer6: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "bottom",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableRowLabel7: {
    flexBasis: "100%",
    textAlign: "center",
    fontSize: 8,
    padding: 2,
    paddingLeft: 4,
  },
  tableRowValue7: {
    height: 55,
    flexBasis: "100%",
    textAlign: "center",
    fontSize: 8,
    padding: 2,
    paddingLeft: 4,
  },
  tableRowLabel77: {
    flexBasis: "100%",
    textAlign: "center",
    fontSize: 6,
    padding: 2,
    paddingLeft: 4,
    paddingVertical: 3,
  },
  tableRowValue77: {
    height: 55,
    textAlign: "center",
    justifyContent: "bottom",
    fontSize: 8,
    padding: 2,
    paddingHorizontal: 5,
    textDecoration: "underline",
    alignItems: "flex-end",
  },
  tableRowContainer7: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableRowValue777: {
    height: 15,
    textAlign: "center",
    justifyContent: "flex-end",
    fontSize: 6,
    textDecoration: "underline",
    alignItems: "flex-end",
    marginTop: 38.5,
    marginBottom: -5,
  },
  tableRowValue7777: {
    textAlign: "center",
    justifyContent: "flex-end",
    fontSize: 6,
    alignItems: "flex-end",
  },
  checkmark: {
    width: 8,
    height: 7,
    backgroundColor: "transparent",
  },
  checkmark2: {
    width: 10,
    backgroundColor: "transparent",
  },
});

const SuratPengajuanCuti = ({ formData, user }) => {
  const [bulanSurat, setBulanSurat] = useState("");
  const [tahunSurat, setTahunSurat] = useState(new Date().getFullYear());
  const [constants, setConstants] = useState([]);
  useEffect(() => {
    getConstants();
  }, []);
  const getConstants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/constants");
      setConstants(response.data);
    } catch (error) {
      console.error("Error fetching constants:", error);
    }
  };

  const getValueByName = (name) => {
    const item = constants.find((obj) => obj.name === name);
    return item ? item.value : null;
  };

  const kepalaKantor = getValueByName("Kepala Kantor");
  const namaKantor = getValueByName("Nama Kantor");
  const nipkepala = getValueByName("NIP Kepala Kantor");
  const TahunSekarang = getValueByName("lastChecked");

  useEffect(() => {
    const months = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
    ];
    const today = new Date();
    const monthIndex = today.getMonth();
    setBulanSurat(months[monthIndex]);

    const year = today.getFullYear();
    setTahunSurat(year);
  }, []);

  const TahunSebelumnya = () => {
    return parseInt(TahunSekarang) - 1;
  };

  const DuaTahunSebelumnya = () => {
    return parseInt(TahunSekarang) - 2;
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* Anak lampiran */}
          <View style={styles.anaklampiran}>
            <Text>ANAK LAMPIRAN 1.b</Text>
            <Text>PERATURAN BADAN KEPEGAWAIAN NEGARA REPUBLIK INDONESIA</Text>
            <Text>NOMOR 24 TAHUN 2017</Text>
            <Text>TENTANG TATA CARA PEMBERIAN CUTI PEGAWAI NEGERI SIPIL</Text>
          </View>

          {/* Address */}
          <View style={styles.address}>
            <Text>Aceh Besar, {formatDate(formData.tglSurat)}</Text>
            <Text>Kepada</Text>
            <Text>Yth. Kepala {namaKantor}</Text>
            <Text>di</Text>
            <Text>Aceh Besar</Text>
          </View>

          {/* Judul */}
          <Text style={styles.title}>
            FORMULIR PERMINTAAN DAN PEMBERIAN CUTI
          </Text>
          <Text style={styles.SubHeading}>
            KP.05.02/{formData.noSurat}/KACB/{bulanSurat}/{tahunSurat}
          </Text>

          {/* Table for Data Pegawai */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>I. DATA PEGAWAI</Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel}>Nama</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue}>{user && user.name}</Text>
                  <View style={styles.tableRowDivider} />
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel}>Jabatan</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue}>{formData.jabatan}</Text>
                  <View style={styles.tableRowDivider} />
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel}>Unit Kerja</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue}>{namaKantor}</Text>
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel}>NIP</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue}>{user && user.nip}</Text>
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel}>Masa Kerja</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue}>{formData.masaKerja}</Text>
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel}>{"\u00A0"}</Text>
                  <Text style={styles.tableRowValue}>{"\u00A0"}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Table for Jenis Cuti */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>
              II. JENIS CUTI YANG DIAMBIL **{" "}
            </Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}>1. Cuti Tahunan</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}>
                    {formData.leaveType === "Cuti Tahunan" && (
                      <Image src={checkmarkImage} style={styles.checkmark} />
                    )}
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}>3. Cuti Sakit </Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}>
                    {formData.leaveType === "Cuti Sakit" && (
                      <Image src={checkmarkImage} style={styles.checkmark} />
                    )}
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}>
                    5. Cuti Karena Alasan Penting
                  </Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}>
                    {formData.leaveType === "Cuti Karena Alasan Penting" && (
                      <Image src={checkmarkImage} style={styles.checkmark} />
                    )}
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}> 2. Cuti Besar </Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}>
                    {formData.leaveType === "Cuti Besar" && (
                      <Image src={checkmarkImage} style={styles.checkmark} />
                    )}
                  </Text>
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}>4. Cuti Melahirkan</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}>
                    {formData.leaveType === "Cuti Melahirkan" && (
                      <Image src={checkmarkImage} style={styles.checkmark} />
                    )}
                  </Text>
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}>
                    6. Cuti di Luar Tanggungan Negara
                  </Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}>
                    {formData.leaveType ===
                      "Cuti di Luar Tanggungan Negara" && (
                      <Image src={checkmarkImage} style={styles.checkmark} />
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Table for Alasan Cuti */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>III. ALASAN CUTI</Text>
            <View style={styles.tableRowContainer}>
              <Text style={styles.tableRowLabel3}>{formData.message}</Text>
            </View>
          </View>

          {/* Table for Lamanya Cuti */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>IV. LAMANYA CUTI </Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel4}>Selama</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue4}>
                    {formData.leaveDays} Hari Kerja
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel4}>Mulai Tanggal</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue4}>
                    {formatDate(formData.startDate)}
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel4}>s/d</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue4}>
                    {formatDate(formData.endDate)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Table for Catatan Cuti */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>V. CATATAN CUTI ***</Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel55}>1. Cuti Tahunan</Text>
                  <Text style={styles.tableRowValue5}></Text>
                  <Text style={styles.tableRowValue5}></Text>
                  <View style={styles.tableRowDivider} />
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel5}>Tahun</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue5}>Sisa</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue5}>Keterangan</Text>
                  <View style={styles.tableRowDivider} />
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel5}>N-2</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue5}>
                    {user && user.sisacutiN2} Hari
                  </Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue5}>
                    Tahun {DuaTahunSebelumnya()}
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel5}>N-1</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue5}>
                    {user && user.sisacutiN1} Hari
                  </Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue5}>
                    Tahun {TahunSebelumnya()}
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel5}>N</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue5}>
                    {user ? user.sisacuti + (user.cutiBersama || 0) : 0} Hari
                  </Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue5}>
                    Tahun {TahunSekarang}
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}>2. Cuti Besar</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}></Text>
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}>3. Cuti Sakit</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}></Text>
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}>4. Cuti Melahirkan</Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}></Text>
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}>
                    5. Cuti Karena Alasan Penting
                  </Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}></Text>
                </View>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel2}>
                    6. Cuti di Luar Tanggungan Negara
                  </Text>
                  <View style={styles.tableRowDivider} />
                  <Text style={styles.tableRowValue2}></Text>
                </View>
              </View>
            </View>
          </View>

          {/* Alamat selama menjalankan Cuti */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>
              VI. ALAMAT SELAMA MENJALANKAN CUTI
            </Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel6}>Alamat Lengkap</Text>
                  <View style={styles.tableRowDivider} />
                </View>

                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowValue6}>
                    {formData.alamatLengkap}
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel6}>Telpon</Text>
                  <View style={styles.tableRowDivider} />
                </View>

                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowValue6}>{formData.noTelpon}</Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel6}>Hormat saya</Text>
                </View>

                <View style={styles.tableRowContainer7}>
                  <Text style={styles.tableRowValue777}>
                    {user && user.name}
                  </Text>
                  <Text style={styles.tableRowValue7777}>
                    NIP.{user && user.nip}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Pertimbangan Atasan Langsung */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>
              VII. PERTIMBANGAN ATASAN LANGSUNG **
            </Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel7}>DISETUJUI</Text>
                  <View style={styles.tableRowDivider} />
                </View>

                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowValue7}>
                    <Image src={checkmarkImage} style={styles.checkmark2} />
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel7}>PERUBAHAN ***</Text>
                  <View style={styles.tableRowDivider} />
                </View>

                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowValue7}></Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel7}>DITANGGUHKAN ***</Text>
                  <View style={styles.tableRowDivider} />
                </View>

                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowValue7}></Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel7}>TIDAK DISETUJUI ***</Text>
                  <View style={styles.tableRowDivider} />
                </View>

                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowValue7}></Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel77}>
                    Kepala {namaKantor}
                  </Text>
                </View>

                <View style={styles.tableRowContainer7}>
                  <Text style={styles.tableRowValue777}>({kepalaKantor})</Text>
                  <Text style={styles.tableRowValue7777}>NIP. {nipkepala}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Pertimbangan Pejabat Yang Berwenang Memberikan Cuti */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>
              VIII. PERTIMBANGAN ATASAN LANGSUNG **
            </Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel7}>DISETUJUI</Text>
                  <View style={styles.tableRowDivider} />
                </View>

                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowValue7}>
                    {" "}
                    <Image src={checkmarkImage} style={styles.checkmark2} />
                  </Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel7}>PERUBAHAN ***</Text>
                  <View style={styles.tableRowDivider} />
                </View>

                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowValue7}></Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel7}>DITANGGUHKAN ***</Text>
                  <View style={styles.tableRowDivider} />
                </View>

                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowValue7}></Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel7}>TIDAK DISETUJUI ***</Text>
                  <View style={styles.tableRowDivider} />
                </View>

                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowValue7}></Text>
                  <View style={styles.tableRowDivider} />
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.tableRowContainer}>
                  <Text style={styles.tableRowLabel77}>
                    Kepala {namaKantor}
                  </Text>
                </View>

                <View style={styles.tableRowContainer7}>
                  <Text style={styles.tableRowValue777}>({kepalaKantor})</Text>
                  <Text style={styles.tableRowValue7777}>NIP. {nipkepala}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Catatan */}
          <View style={styles.catatan2}>
            <Text style={styles.catatan}>Catatan:</Text>
            <Text>
              * {"\u00A0"}
              {"\u00A0"} {"\u00A0"} {"\u00A0"} {"\u00A0"} Coret yang tidak perlu
            </Text>
            <Text>
              ** {"\u00A0"}
              {"\u00A0"} {"\u00A0"} {"\u00A0"} Pilih salah satu dengan memberi
              tanda centang ({" "}
              <Image src={checkmarkImage} style={styles.checkmark} /> )
            </Text>
            <Text>
              *** {"\u00A0"} {"\u00A0"}
              {"\u00A0"} diisi oleh pejabat yang menangani bidang kepegawaian
              sebelum PNS mengajukan Cuti
            </Text>
            <Text>
              **** {"\u00A0"}
              {"\u00A0"} diberi tanda centang dan alasannya.
            </Text>
            <Text>
              N {"\u00A0"}
              {"\u00A0"} {"\u00A0"} {"\u00A0"} Cuti tahun berjalan
            </Text>
            <Text>
              N-1 {"\u00A0"}
              {"\u00A0"} Sisa cuti 1 tahun sebelumnya
            </Text>
            <Text>
              N-2 {"\u00A0"}
              {"\u00A0"} Sisa cuti 2 tahun sebelumnya
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SuratPengajuanCuti;
