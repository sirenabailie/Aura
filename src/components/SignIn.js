'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
      }}
    >
      {/* Optimized Background Image */}
      <Image
        src="/images/auraHome.png"
        alt="Aura Background"
        layout="fill"
        objectFit="cover"
        quality={100} // High quality for sharpness
        priority // Ensures image loads quickly
      />

      {/* Content */}
      <div
        style={{
          position: 'fixed',
          top: '75%',
          left: '58%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'transparent', // Adds readability
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Button className="signInBtn" variant="outline-light" size="lg" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
