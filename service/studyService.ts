import api from './api';

interface OverviewStats {
    totalQuestions: number;
    correctAnswers: number;
    averageAccuracy: number;
    strongestSubject: string;
    weakestSubject: string;
}

export async function getOverviewStats(userId: number): Promise<OverviewStats> {
    try {
        console.log('user.id', userId)
        const response = await api.post('/conexao/totalizadores/dadosgerais', {
            id: 8,
        });

        const raw = response.data;
        const decoded = decodeURIComponent(raw);
        const data = JSON.parse(decoded);

        console.log(data, "data")
        return {
            totalQuestions: data.qtdRespondidas,
            correctAnswers: data.qtdAcertos,
            averageAccuracy: data.qtdRespondidas
                ? Math.round((data.qtdAcertos / data.qtdRespondidas) * 100)
                : 0,
            strongestSubject: data.temaDominado?.nome ?? '--',
            weakestSubject: data.temaMenosDominado?.nome ?? '--',
        };
    } catch (error) {
        console.error('Erro ao buscar dados gerais:', error);
        throw error;
    }
}

export async function getThemeStats(idUsuario: number, ordenacao: string) {
    try {
        const body = { idUsuario, ordenacao };
        const response = await api.post('/conexao/totalizadores/secoesTemas', body);
        const raw = response.data;
        const decoded = decodeURIComponent(raw);
        const data = JSON.parse(decoded);

        console.log(data, "thmeas")

        return data;
    } catch (error) {
        console.error('Erro ao buscar estatísticas de temas:', error);

        throw error;
    }
}

