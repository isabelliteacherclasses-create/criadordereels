export default async function handler(req, res) {
    // 1. Bloqueia qualquer acesso que não seja o envio do seu formulário
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido.' });
    }

    // 2. Recebe o texto que escreveu no ecrã
    const { roteiro } = req.body;

    try {
        // 3. Aqui entrará a chave secreta e a ligação ao VideoGen no próximo passo.
        // Por agora, vamos simular que a IA respondeu com sucesso para testar a ponte:
        
        res.status(200).json({
            sucesso: true,
            mensagem: "Ligação segura estabelecida com sucesso! A ponte está pronta.",
            roteiroRecebido: roteiro
        });

    } catch (error) {
        res.status(500).json({ erro: 'Falha na comunicação com a IA.' });
    }
}
