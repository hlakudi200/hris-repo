'use client'
import ApplicantProfile from '@/_componets/applicantProfile/applicantProfile'
import React from 'react'
import styles from "./styles/styles.module.css";

const Profile=()=> {
  return (
    <div className={styles.container}><ApplicantProfile></ApplicantProfile></div>
  )
}

export default Profile;
