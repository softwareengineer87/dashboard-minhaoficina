class Format {

  static formatTime(time: number) {
    return new Intl.RelativeTimeFormat('pt-BR', {
      numeric: 'auto'
    }).format(time, 'hour');
  }

  static formatPrice(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  static formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
    }).format(date);
  }

}

export { Format }
