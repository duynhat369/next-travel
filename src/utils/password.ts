// Hàm đánh giá độ mạnh của mật khẩu
export const getPasswordStrength = (
  password: string
): { strength: number; label: string; color: string } => {
  if (!password) return { strength: 0, label: 'Rất yếu', color: 'bg-red-500' };

  let strength = 0;

  // Độ dài
  if (password.length >= 6) strength += 1;
  if (password.length >= 8) strength += 1;

  // Độ phức tạp
  if (/[A-Z]/.test(password)) strength += 1; // Chữ hoa
  if (/[0-9]/.test(password)) strength += 1; // Số
  if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Ký tự đặc biệt

  // Xác định nhãn và màu
  if (strength <= 1) return { strength: 20, label: 'Rất yếu', color: 'bg-red-500' };
  if (strength === 2) return { strength: 40, label: 'Yếu', color: 'bg-orange-500' };
  if (strength === 3) return { strength: 60, label: 'Trung bình', color: 'bg-yellow-500' };
  if (strength === 4) return { strength: 80, label: 'Mạnh', color: 'bg-lime-500' };
  return { strength: 100, label: 'Rất mạnh', color: 'bg-green-500' };
};
