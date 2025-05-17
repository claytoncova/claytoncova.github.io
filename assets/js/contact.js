document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('.submit-btn');
    const originalButtonText = submitButton.innerHTML;

    // Carregar configurações do bot
    const loadBotConfig = async () => {
        try {
            const response = await fetch('config/bot-config.json');
            if (!response.ok) throw new Error('Configuração do bot não encontrada');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar configuração do bot:', error);
            return null;
        }
    };

    // Função para enviar mensagem para o bot do Telegram
    const sendToTelegram = async (message) => {
        const config = await loadBotConfig();
        if (!config) {
            throw new Error('Configuração do bot não disponível');
        }

        const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;
        const data = {
            chat_id: config.chatId,
            text: message,
            parse_mode: 'HTML'
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar mensagem para o Telegram');
        }

        return await response.json();
    };

    // Função para formatar a mensagem
    const formatMessage = (formData) => {
        return `
<b>Nova mensagem de contato</b>

👤 <b>Nome:</b> ${formData.get('name')}
📧 <b>Email:</b> ${formData.get('email')}
📝 <b>Assunto:</b> ${formData.get('subject')}
💬 <b>Mensagem:</b>

${formData.get('message')}

⏰ <i>Enviado em: ${new Date().toLocaleString('pt-BR')}</i>
        `;
    };

    // Função para mostrar feedback ao usuário
    const showFeedback = (message, isError = false) => {
        const feedback = document.createElement('div');
        feedback.className = `feedback ${isError ? 'error' : 'success'}`;
        feedback.textContent = message;
        
        contactForm.insertAdjacentElement('beforebegin', feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 5000);
    };

    // Manipular envio do formulário
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Desabilitar botão e mostrar loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        try {
            const formData = new FormData(contactForm);
            const message = formatMessage(formData);
            
            await sendToTelegram(message);
            
            // Limpar formulário e mostrar sucesso
            contactForm.reset();
            showFeedback('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            showFeedback('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.', true);
        } finally {
            // Restaurar botão
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}); 