const { Aluno } = require('../models'); // ou outros modelos como Curso, Modulo, etc.

module.exports = {
    // Buscar progresso de um aluno
    async obterProgresso(req, res) {
        const { id } = req.params;
        try {
            const aluno = await Aluno.findByPk(id);
            if (!aluno) {
                return res.status(404).json({ error: "Aluno não encontrado" });
            }
            return res.status(200).json({ progresso: aluno.progresso });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar progresso", details: error.message });
        }
    },

    // Atualizar progresso do aluno
    async atualizarProgresso(req, res) {
        const { id } = req.params;
        const { progresso } = req.body;

        try {
            const aluno = await Aluno.findByPk(id);
            if (!aluno) {
                return res.status(404).json({ error: "Aluno não encontrado" });
            }

            aluno.progresso = progresso;
            await aluno.save();

            return res.status(200).json({ message: "Progresso atualizado com sucesso", aluno });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar progresso", details: error.message });
        }
    }
};