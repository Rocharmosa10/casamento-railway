function countdown(targetDate) {
    // Converte a data-alvo em um timestamp (milissegundos desde 1970)
    const targetTime = new Date(targetDate).getTime();
  
    function updateCountdown() {
        // Obtém o timestamp atual
        const now = new Date().getTime();
        // Calcula a diferença entre a data-alvo e o tempo atual
        const difference = targetTime - now;
  
        // Se o tempo acabou, para o contador e exibe a mensagem
        if (difference <= 0) {
            clearInterval(interval); // Interrompe o intervalo de atualização
            document.getElementById("countdown").innerHTML = "Evento Iniciado!";
            return; // Sai da função para evitar cálculos desnecessários
        }
  
        // Calcula os dias restantes
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        // Calcula as horas restantes após remover os dias
        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        // Calcula os minutos restantes após remover as horas
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        // Calcula os segundos restantes após remover os minutos
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
        // Atualiza os elementos HTML com os valores calculados
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }
  
    // Chama a função imediatamente para evitar atraso na exibição inicial
    updateCountdown();
    // Define um intervalo para atualizar o contador a cada segundo
    const interval = setInterval(updateCountdown, 1000);
}
  
  // Defina a data alvo para a contagem regressiva
  countdown("2025-07-12T23:59:59"); // Substitua pela data do seu evento