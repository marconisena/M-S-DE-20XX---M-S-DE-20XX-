class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'] },
            LEOPARDO: { tamanho: 2, biomas: ['savana'] },
            CROCODILO: { tamanho: 3, biomas: ['rio'] },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, biomas: ['savana'] },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const espacoNecessario = this.animais[animal].tamanho * quantidade;

        const recintosViaveis = this.recintos.filter(recinto => {
            const biomaAdequado = this.animais[animal].biomas.includes(recinto.bioma);
            const espacoOcupado = recinto.animais.reduce((acc, a) => acc + this.animais[a.especie].tamanho * a.quantidade, 0);
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

          
            return biomaAdequado && espacoLivre >= espacoNecessario;
        }).map(recinto => {
            const espacoOcupado = recinto.animais.reduce((acc, a) => acc + this.animais[a.especie].tamanho * a.quantidade, 0);
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado - espacoNecessario;
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export {RecintosZoo as RecintosZoo};
