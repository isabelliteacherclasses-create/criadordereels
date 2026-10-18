export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido' });
    }

    const { texto } = req.body;
    const apiKey = "sk_206fdf2b78193664e034059f0da8ae5cecf09308198d2c8e";
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel

    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json',
                'Accept': 'audio/mpeg'
            },
            body: JSON.stringify({
                text: texto,
                model_id: "eleven_multilingual_v2",
                voice_settings: { stability: 0.45, similarity_boost: 0.75 }
            })
        });

        if (!response.ok) {
            const erroDetalhe = await response.text();
            throw new Error(`Erro na ElevenLabs: ${erroDetalhe}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.setHeader('Content-Type', 'audio/mpeg');
        return res.status(200).send(buffer);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
}
