// *Para verificar que no queden espacios en los inputs ni al inicio ni al final
export function hasLeadingOrTrailingSpace(name) {
    return /^\s/.test(name) || /\s$/.test(name);
  }