"use client"; // This is a client component

import React, { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#ff5a5f', // Coral/red background color
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background circles */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        top: '-100px',
        left: '-100px'
      }}></div>
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        bottom: '-50px',
        right: '-50px'
      }}></div>
      
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        {/* Illustration */}
        <div style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '200px',
            height: '200px',
            backgroundImage: 'url("/illustration.svg")', // You'll need to add this image
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}></div>
        </div>
        
        <h1 style={{
          marginBottom: '10px',
          color: '#333',
          fontSize: '24px'
        }}>{isLogin ? 'Kamu belum masuk ke akun' : 'Daftar Akun Baru'}</h1>
        
        <p style={{
          marginBottom: '30px',
          color: '#666',
          fontSize: '14px'
        }}>
          {isLogin 
            ? 'Masuk ke akun kamu dulu yuk biar bisa lihat profilmu dan mengakses semua fitur menarik dari Sepulsa' 
            : 'Daftar untuk mengakses semua fitur menarik dari Sepulsa'}
        </p>

        {isLogin ? (
          // Login Form
          <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <input
                type="email"
                id="loginEmail"
                name="loginEmail"
                placeholder="Email"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ textAlign: 'left' }}>
              <input
                type="password"
                id="loginPassword"
                name="loginPassword"
                placeholder="Password"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#ff5a5f',
                color: '#fff',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '18px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Masuk
            </button>
          </form>
        ) : (
          // Register Form
          <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <input
                type="text"
                id="registerName"
                name="registerName"
                placeholder="Nama Lengkap"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ textAlign: 'left' }}>
              <input
                type="email"
                id="registerEmail"
                name="registerEmail"
                placeholder="Email"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ textAlign: 'left' }}>
              <input
                type="password"
                id="registerPassword"
                name="registerPassword"
                placeholder="Password"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#ff5a5f',
                color: '#fff',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '18px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Daftar
            </button>
          </form>
        )}

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px',
          marginTop: '30px'
        }}>
          <button
            type="button"
            style={{
              backgroundColor: isLogin ? '#ff5a5f' : '#fff',
              color: isLogin ? '#fff' : '#ff5a5f',
              padding: '10px 20px',
              border: isLogin ? 'none' : '1px solid #ff5a5f',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              flex: '1',
              maxWidth: '150px'
            }}
            onClick={isLogin ? undefined : toggleForm}
          >
            Masuk
          </button>
          <button
            type="button"
            style={{
              backgroundColor: isLogin ? '#fff' : '#ff5a5f',
              color: isLogin ? '#ff5a5f' : '#fff',
              padding: '10px 20px',
              border: isLogin ? '1px solid #ff5a5f' : 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              flex: '1',
              maxWidth: '150px'
            }}
            onClick={isLogin ? toggleForm : undefined}
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}