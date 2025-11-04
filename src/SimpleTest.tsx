import React from 'react';

function SimpleTest() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#333' }}>🎉 Test Staff Dashboard</h1>
      <p>Nếu bạn thấy text này, React đã hoạt động!</p>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h2>Checklist:</h2>
        <ul>
          <li>✅ Server đang chạy</li>
          <li>✅ React đang render</li>
          <li>⏳ Đang load Tailwind CSS...</li>
        </ul>
      </div>
    </div>
  );
}

export default SimpleTest;
