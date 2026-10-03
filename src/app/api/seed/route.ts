import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST() {
  try {
    // Clean existing data
    await db.notification.deleteMany()
    await db.notificationPreference.deleteMany()
    await db.prescription.deleteMany()
    await db.medicalRecord.deleteMany()
    await db.appointment.deleteMany()
    await db.department.deleteMany()
    await db.user.deleteMany()

    // Create doctors
    const drSmith = await db.user.create({
      data: {
        username: 'drsmith',
        email: 'drsmith@ehospital.com',
        password: hashPassword('password123'),
        firstName: 'John',
        lastName: 'Smith',
        role: 'doctor',
        specialization: 'Cardiology',
        medicalLicense: 'MD-12345',
        phoneNumber: '+1234567890',
        bio: 'Board-certified cardiologist with 15 years of experience.',
      },
    })

    const drJohnson = await db.user.create({
      data: {
        username: 'drjohnson',
        email: 'drjohnson@ehospital.com',
        password: hashPassword('password123'),
        firstName: 'Emily',
        lastName: 'Johnson',
        role: 'doctor',
        specialization: 'Neurology',
        medicalLicense: 'MD-67890',
        phoneNumber: '+1234567891',
        bio: 'Neurologist specializing in epilepsy and stroke care.',
      },
    })

    const drWilliams = await db.user.create({
      data: {
        username: 'drwilliams',
        email: 'drwilliams@ehospital.com',
        password: hashPassword('password123'),
        firstName: 'Michael',
        lastName: 'Williams',
        role: 'doctor',
        specialization: 'Pediatrics',
        medicalLicense: 'MD-54321',
        phoneNumber: '+1234567892',
        bio: 'Pediatrician focused on child wellness and development.',
      },
    })

    // Create demo patient
    const patient = await db.user.create({
      data: {
        username: 'janedoe',
        email: 'patient@ehospital.com',
        password: hashPassword('password123'),
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'patient',
        phoneNumber: '+1234567893',
        bio: 'Demo patient account for exploring the E-Hospital system.',
      },
    })

    // Create departments
    const cardiology = await db.department.create({
      data: {
        name: 'Cardiology',
        description: 'Heart and cardiovascular system care',
        headId: drSmith.id,
      },
    })

    const neurology = await db.department.create({
      data: {
        name: 'Neurology',
        description: 'Brain and nervous system care',
        headId: drJohnson.id,
      },
    })

    await db.department.create({
      data: {
        name: 'Pediatrics',
        description: 'Child healthcare services',
        headId: drWilliams.id,
      },
    })

    // Create appointment preferences for all users
    for (const u of [drSmith, drJohnson, drWilliams, patient]) {
      await db.notificationPreference.create({ data: { userId: u.id } })
    }

    // Create appointments
    const now = new Date()
    const apt1 = await db.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: drSmith.id,
        departmentId: cardiology.id,
        appointmentDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        durationMinutes: 30,
        reason: 'Routine cardiac checkup and ECG review',
        status: 'scheduled',
        notes: 'Patient reports occasional chest tightness during exercise.',
      },
    })

    const apt2 = await db.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: drJohnson.id,
        departmentId: neurology.id,
        appointmentDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
        durationMinutes: 45,
        reason: 'Migraine consultation and treatment plan',
        status: 'completed',
        notes: 'Prescribed preventive medication. Follow-up in 2 months.',
      },
    })

    const apt3 = await db.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: drSmith.id,
        departmentId: cardiology.id,
        appointmentDate: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
        durationMinutes: 30,
        reason: 'Follow-up on blood pressure management',
        status: 'scheduled',
        notes: '',
      },
    })

    // Create medical records
    await db.medicalRecord.create({
      data: {
        patientId: patient.id,
        doctorId: drJohnson.id,
        recordType: 'diagnosis',
        title: 'Chronic Migraine without Aura',
        description:
          'Patient presents with recurring moderate-to-severe headaches lasting 4-72 hours, accompanied by photophobia and phonophobia.',
        findings:
          'Neurological examination normal. Headache frequency: 8-10 episodes per month. No red flags on imaging.',
        recommendations:
          'Initiate preventive therapy with propranolol. Maintain headache diary. Lifestyle modifications including regular sleep, hydration, and stress management.',
        recordDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
        isVerified: true,
      },
    })

    await db.medicalRecord.create({
      data: {
        patientId: patient.id,
        doctorId: drSmith.id,
        recordType: 'lab_result',
        title: 'Lipid Panel Results',
        description:
          'Routine lipid panel to assess cardiovascular risk profile.',
        findings:
          'Total Cholesterol: 210 mg/dL (borderline). LDL: 145 mg/dL (high). HDL: 55 mg/dL (normal). Triglycerides: 150 mg/dL (borderline).',
        recommendations:
          'Dietary modifications to reduce saturated fat intake. Increase physical activity. Recheck in 3 months.',
        recordDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        isVerified: true,
      },
    })

    await db.medicalRecord.create({
      data: {
        patientId: patient.id,
        doctorId: drSmith.id,
        recordType: 'imaging',
        title: 'Chest X-Ray',
        description: 'Chest radiograph to evaluate cardiac silhouette and lung fields.',
        findings:
          'Heart size normal. Lungs clear. No active infiltrates or effusions. Costophrenic angles sharp.',
        recommendations: 'No further imaging indicated at this time.',
        recordDate: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000),
        isVerified: true,
      },
    })

    // Create prescriptions
    await db.prescription.create({
      data: {
        patientId: patient.id,
        doctorId: drJohnson.id,
        prescriptionDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
        issueDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
        expiryDate: new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000),
        medicineName: 'Propranolol',
        genericName: 'Propranolol Hydrochloride',
        strength: '40 mg',
        form: 'tablet',
        manufacturer: 'PharmaCorp',
        dosage: '1 tablet',
        frequency: 'Twice daily',
        duration: '90 days',
        instructions:
          'Take with food. Do not abruptly discontinue. Monitor blood pressure and heart rate regularly.',
        quantity: 60,
        refills: 3,
        refillsRemaining: 2,
        status: 'active',
        isActive: true,
      },
    })

    await db.prescription.create({
      data: {
        patientId: patient.id,
        doctorId: drJohnson.id,
        prescriptionDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
        issueDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
        expiryDate: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
        medicineName: 'Sumatriptan',
        genericName: 'Sumatriptan Succinate',
        strength: '50 mg',
        form: 'tablet',
        manufacturer: 'NeuroMed',
        dosage: '1 tablet',
        frequency: 'As needed for migraine',
        duration: '30 days',
        instructions:
          'Take at first sign of migraine. May repeat after 2 hours if needed. Maximum 200 mg per 24 hours.',
        quantity: 12,
        refills: 1,
        refillsRemaining: 1,
        status: 'active',
        isActive: true,
      },
    })

    await db.prescription.create({
      data: {
        patientId: patient.id,
        doctorId: drSmith.id,
        prescriptionDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        issueDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        expiryDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        medicineName: 'Atorvastatin',
        genericName: 'Atorvastatin Calcium',
        strength: '20 mg',
        form: 'tablet',
        manufacturer: 'CardioPharm',
        dosage: '1 tablet',
        frequency: 'Once daily at bedtime',
        duration: '30 days',
        instructions: 'Take in the evening. Avoid grapefruit juice. Report unexplained muscle pain.',
        quantity: 30,
        refills: 0,
        refillsRemaining: 0,
        status: 'expired',
        isActive: false,
      },
    })

    // Create notifications for the patient
    await db.notification.create({
      data: {
        userId: patient.id,
        notificationType: 'appointment',
        title: 'Appointment Confirmed',
        message: `Your appointment with Dr. John Smith on ${apt1.appointmentDate.toLocaleString()} has been scheduled.`,
        relatedObjectUrl: '',
        isRead: false,
      },
    })

    await db.notification.create({
      data: {
        userId: patient.id,
        notificationType: 'prescription',
        title: 'Prescription Ready',
        message: 'Your Propranolol prescription is ready for pickup at the pharmacy.',
        relatedObjectUrl: '',
        isRead: false,
      },
    })

    await db.notification.create({
      data: {
        userId: patient.id,
        notificationType: 'medical_record',
        title: 'New Lab Results Available',
        message: 'Your Lipid Panel results have been added to your medical records.',
        relatedObjectUrl: '',
        isRead: true,
      },
    })

    await db.notification.create({
      data: {
        userId: patient.id,
        notificationType: 'appointment',
        title: 'Upcoming Appointment Reminder',
        message: `Reminder: You have an appointment with Dr. John Smith in 7 days.`,
        relatedObjectUrl: '',
        isRead: false,
      },
    })

    return NextResponse.json({
      message: 'Database seeded successfully',
      credentials: {
        patient: { email: 'patient@ehospital.com', password: 'password123' },
        doctor: { email: 'drsmith@ehospital.com', password: 'password123' },
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || 'Seed failed' },
      { status: 500 }
    )
  }
}
