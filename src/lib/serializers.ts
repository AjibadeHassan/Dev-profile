import { db } from '@/lib/db'

export function serializeUser(user: any) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    bio: user.bio,
    phoneNumber: user.phoneNumber,
    specialization: user.specialization,
    medicalLicense: user.medicalLicense,
    isVerified: user.isVerified,
    isActive: user.isActive,
    createdAt: user.createdAt?.toISOString?.() || user.createdAt,
  }
}

export async function serializeAppointment(appointment: any) {
  const patient = await db.user.findUnique({ where: { id: appointment.patientId } })
  const doctor = await db.user.findUnique({ where: { id: appointment.doctorId } })
  const department = appointment.departmentId
    ? await db.department.findUnique({ where: { id: appointment.departmentId } })
    : null

  return {
    id: appointment.id,
    patientId: appointment.patientId,
    patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown',
    doctorId: appointment.doctorId,
    doctorName: doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown',
    doctorEmail: doctor?.email || '',
    departmentName: department?.name || 'General',
    appointmentDate: appointment.appointmentDate.toISOString(),
    durationMinutes: appointment.durationMinutes,
    reason: appointment.reason,
    status: appointment.status,
    notes: appointment.notes,
    createdAt: appointment.createdAt.toISOString(),
  }
}

export function serializeMedicalRecord(record: any) {
  return {
    id: record.id,
    patientId: record.patientId,
    patientName: record.patientName || '',
    doctorId: record.doctorId || '',
    doctorName: record.doctorName || '',
    doctorEmail: record.doctorEmail || '',
    recordType: record.recordType,
    title: record.title,
    description: record.description,
    findings: record.findings,
    recommendations: record.recommendations,
    recordDate: record.recordDate.toISOString(),
    fileUrl: record.fileUrl,
    isVerified: record.isVerified,
    createdAt: record.createdAt.toISOString(),
  }
}

export async function serializeMedicalRecordAsync(record: any) {
  const patient = await db.user.findUnique({ where: { id: record.patientId } })
  const doctor = record.doctorId
    ? await db.user.findUnique({ where: { id: record.doctorId } })
    : null
  return {
    id: record.id,
    patientId: record.patientId,
    patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown',
    doctorId: record.doctorId || '',
    doctorName: doctor ? `${doctor.firstName} ${doctor.lastName}` : '',
    doctorEmail: doctor?.email || '',
    recordType: record.recordType,
    title: record.title,
    description: record.description,
    findings: record.findings,
    recommendations: record.recommendations,
    recordDate: record.recordDate.toISOString(),
    fileUrl: record.fileUrl,
    isVerified: record.isVerified,
    createdAt: record.createdAt.toISOString(),
  }
}

export async function serializePrescription(prescription: any) {
  const patient = await db.user.findUnique({ where: { id: prescription.patientId } })
  const doctor = prescription.doctorId
    ? await db.user.findUnique({ where: { id: prescription.doctorId } })
    : null
  return {
    id: prescription.id,
    patientId: prescription.patientId,
    patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown',
    doctorId: prescription.doctorId || '',
    doctorName: doctor ? `${doctor.firstName} ${doctor.lastName}` : '',
    doctorEmail: doctor?.email || '',
    medicineName: prescription.medicineName,
    genericName: prescription.genericName,
    strength: prescription.strength,
    form: prescription.form,
    manufacturer: prescription.manufacturer,
    dosage: prescription.dosage,
    frequency: prescription.frequency,
    duration: prescription.duration,
    instructions: prescription.instructions,
    quantity: prescription.quantity,
    refills: prescription.refills,
    refillsRemaining: prescription.refillsRemaining,
    status: prescription.status,
    isActive: prescription.isActive,
    prescriptionDate: prescription.prescriptionDate.toISOString(),
    createdAt: prescription.createdAt.toISOString(),
  }
}

export function serializeNotification(notification: any) {
  return {
    id: notification.id,
    userId: notification.userId,
    notificationType: notification.notificationType,
    title: notification.title,
    message: notification.message,
    relatedObjectUrl: notification.relatedObjectUrl,
    isRead: notification.isRead,
    createdAt: notification.createdAt.toISOString(),
  }
}
