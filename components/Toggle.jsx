"use client"

const Toggle = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />

      {/* Track */}
      <div
        className="
          w-14 h-8 
          bg-gray-300 
          rounded-full 
          peer-checked:bg-blue-500 
          transition-colors duration-300
        "
      ></div>

      {/* Thumb */}
      <div
        className="
          absolute left-1 top-1
          w-6 h-6
          bg-white
          rounded-full
          shadow-md
          transition-transform duration-300
          peer-checked:translate-x-6
        "
      ></div>
    </label>
  )
}

export default Toggle
