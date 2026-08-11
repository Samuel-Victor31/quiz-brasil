document.addEventListener("DOMContentLoaded", function () {
    // Gabarito oficial com perguntas
    const gabarito = {
        pergunta1: { resposta: "Amazonas", pergunta: "Qual é o maior estado do Brasil em extensão territorial?" },
        pergunta2: { resposta: "Brasília", pergunta: "Qual é a capital do Brasil?" },
        pergunta3: { resposta: "Rio Amazonas", pergunta: "Qual é o maior rio do Brasil?" },
        pergunta4: { resposta: "São Paulo", pergunta: "Qual é a maior cidade do Brasil em população?" },
        pergunta5: { resposta: "Amazônia", pergunta: "Qual é o maior bioma do Brasil?" },
        pergunta6: { resposta: "lula", pergunta: "Qual é o nome do atual presidente do Brasil?" },
        pergunta7: { resposta: "1822-09-07", pergunta: "Qual é a data de independência do Brasil?" },
        pergunta8: { resposta: "Pacífico", pergunta: "Qual é o maior oceano do mundo?" },
        pergunta9: { resposta: ["Acre", "Amazonas", "Roraima"], pergunta: "Quais desses estados fazem parte da região Norte do Brasil?" },
        pergunta10: { resposta: "Real", pergunta: "Qual é a moeda oficial do Brasil?" },
        pergunta11: { resposta: ["cristo redentor", "cristo"], pergunta: "Qual é o nome do monumento mostrado na imagem abaixo?" }
    };

    // Função para criar/obter a caixa de mensagem dentro da section
    function obterOuCriarFeedback(section) {
        let feedback = section.querySelector(".feedback-instantaneo");
        if (!feedback) {
            feedback = document.createElement("div");
            feedback.className = "feedback-instantaneo";
            section.appendChild(feedback);
        }
        return feedback;
    }

    function exibirFeedback(section, estaCorreto, mensagemIncorreta = "✕ Você errou! Tente novamente.") {
        const feedback = obterOuCriarFeedback(section);
        if (estaCorreto) {
            feedback.textContent = "✓ Você acertou!";
            feedback.className = "feedback-instantaneo correto";
        } else {
            feedback.textContent = mensagemIncorreta;
            feedback.className = "feedback-instantaneo incorreto";
        }
    }

    // 1. Radio Buttons (Perguntas 1 a 5)
    for (let i = 1; i <= 5; i++) {
        const radios = document.querySelectorAll(`input[name="pergunta${i}"]`);
        radios.forEach(radio => {
            radio.addEventListener("change", function () {
                const section = this.closest("section");
                const acertou = this.value === gabarito[`pergunta${i}`].resposta;
                exibirFeedback(section, acertou);
            });
        });
    }

    // 2. Pergunta 6 (Presidente - Texto)
    const p6 = document.getElementById("p6");
    if (p6) {
        p6.addEventListener("input", function () {
            const section = this.closest("section");
            const resposta = this.value.trim().toLowerCase();
            if (resposta === "") {
                const fb = section.querySelector(".feedback-instantaneo");
                if (fb) fb.remove();
                return;
            }
            const acertou = resposta.includes(gabarito.pergunta6.resposta);
            exibirFeedback(section, acertou);
        });
    }

    // 3. Pergunta 7 (Data de Independência)
    const p7 = document.getElementById("p7");
    if (p7) {
        p7.addEventListener("change", function () {
            const section = this.closest("section");
            if (!this.value) return;
            const acertou = this.value === gabarito.pergunta7.resposta;
            exibirFeedback(section, acertou);
        });
    }

    // 4. Pergunta 8 (Oceano - Select)
    const p8 = document.getElementById("p8");
    if (p8) {
        p8.addEventListener("change", function () {
            const section = this.closest("section");
            const acertou = this.value === gabarito.pergunta8.resposta;
            exibirFeedback(section, acertou);
        });
    }

    // 5. Pergunta 9 (Região Norte - Checkboxes)
    const checkboxesP9 = document.querySelectorAll(`input[name="pergunta9"]`);
    checkboxesP9.forEach(cb => {
        cb.addEventListener("change", function () {
            const section = this.closest("section");
            const acre = document.getElementById("p1f").checked;
            const amazonas = document.getElementById("p2f").checked;
            const bahia = document.getElementById("p3f").checked;
            const roraima = document.getElementById("p4f").checked;

            if (!acre && !amazonas && !bahia && !roraima) {
                const fb = section.querySelector(".feedback-instantaneo");
                if (fb) fb.remove();
                return;
            }

            const acertou = acre && amazonas && roraima && !bahia;
            exibirFeedback(section, acertou, "✕ Seleção incorreta! Marque apenas os estados do Norte.");
        });
    });

    // 6. Pergunta 10 (Moeda - Select)
    const p10 = document.getElementById("p10");
    if (p10) {
        p10.addEventListener("change", function () {
            const section = this.closest("section");
            const acertou = this.value === gabarito.pergunta10.resposta;
            exibirFeedback(section, acertou);
        });
    }

    // 7. Pergunta 11 (Monumento - Texto)
    const p11 = document.getElementById("p11");
    if (p11) {
        p11.addEventListener("input", function () {
            const section = this.closest("section");
            const resposta = this.value.trim().toLowerCase();
            if (resposta === "") {
                const fb = section.querySelector(".feedback-instantaneo");
                if (fb) fb.remove();
                return;
            }
            const acertou = gabarito.pergunta11.resposta.some(termo => resposta.includes(termo));
            exibirFeedback(section, acertou);
        });
    }

    // ========== FUNÇÃO PARA GERAR RELATÓRIO DETALHADO ==========
    function gerarRelatorioDetalhado() {
        let pontos = 0;
        const resultados = [];

        // Verificar Pergunta 1 a 5 (Radio Buttons)
        for (let i = 1; i <= 5; i++) {
            const sel = document.querySelector(`input[name="pergunta${i}"]:checked`);
            const respostaSelecionada = sel ? sel.value : null;
            const respostaCorreta = gabarito[`pergunta${i}`].resposta;
            const acertou = respostaSelecionada === respostaCorreta;
            
            if (acertou) pontos++;
            resultados.push({
                numero: i,
                pergunta: gabarito[`pergunta${i}`].pergunta,
                respostaSelecionada: respostaSelecionada || "Não respondida",
                respostaCorreta: respostaCorreta,
                acertou: acertou
            });
        }

        // Pergunta 6 (Presidente - Texto)
        const resposta6 = p6 ? p6.value.trim().toLowerCase() : "";
        const respostaCorreta6 = gabarito.pergunta6.resposta;
        const acertou6 = resposta6.includes(respostaCorreta6);
        if (acertou6) pontos++;
        resultados.push({
            numero: 6,
            pergunta: gabarito.pergunta6.pergunta,
            respostaSelecionada: resposta6 || "Não respondida",
            respostaCorreta: respostaCorreta6,
            acertou: acertou6
        });

        // Pergunta 7 (Data)
        const resposta7 = p7 ? p7.value : "";
        const respostaCorreta7 = gabarito.pergunta7.resposta;
        const acertou7 = resposta7 === respostaCorreta7;
        if (acertou7) pontos++;
        resultados.push({
            numero: 7,
            pergunta: gabarito.pergunta7.pergunta,
            respostaSelecionada: resposta7 || "Não respondida",
            respostaCorreta: respostaCorreta7,
            acertou: acertou7
        });

        // Pergunta 8 (Oceano - Select)
        const resposta8 = p8 ? p8.value : "";
        const respostaCorreta8 = gabarito.pergunta8.resposta;
        const acertou8 = resposta8 === respostaCorreta8;
        if (acertou8) pontos++;
        resultados.push({
            numero: 8,
            pergunta: gabarito.pergunta8.pergunta,
            respostaSelecionada: resposta8 || "Não respondida",
            respostaCorreta: respostaCorreta8,
            acertou: acertou8
        });

        // Pergunta 9 (Checkboxes)
        const acre = document.getElementById("p1f")?.checked;
        const amazonas = document.getElementById("p2f")?.checked;
        const bahia = document.getElementById("p3f")?.checked;
        const roraima = document.getElementById("p4f")?.checked;
        
        const respostaSelecionada9 = [];
        if (acre) respostaSelecionada9.push("Acre");
        if (amazonas) respostaSelecionada9.push("Amazonas");
        if (bahia) respostaSelecionada9.push("Bahia");
        if (roraima) respostaSelecionada9.push("Roraima");

        const acertou9 = acre && amazonas && roraima && !bahia;
        if (acertou9) pontos++;
        resultados.push({
            numero: 9,
            pergunta: gabarito.pergunta9.pergunta,
            respostaSelecionada: respostaSelecionada9.length > 0 ? respostaSelecionada9.join(", ") : "Não respondida",
            respostaCorreta: gabarito.pergunta9.resposta.join(", "),
            acertou: acertou9
        });

        // Pergunta 10 (Moeda - Select)
        const resposta10 = p10 ? p10.value : "";
        const respostaCorreta10 = gabarito.pergunta10.resposta;
        const acertou10 = resposta10 === respostaCorreta10;
        if (acertou10) pontos++;
        resultados.push({
            numero: 10,
            pergunta: gabarito.pergunta10.pergunta,
            respostaSelecionada: resposta10 || "Não respondida",
            respostaCorreta: respostaCorreta10,
            acertou: acertou10
        });

        // Pergunta 11 (Monumento - Texto)
        const resposta11 = p11 ? p11.value.trim().toLowerCase() : "";
        const acertou11 = gabarito.pergunta11.resposta.some(t => resposta11.includes(t));
        if (acertou11) pontos++;
        resultados.push({
            numero: 11,
            pergunta: gabarito.pergunta11.pergunta,
            respostaSelecionada: resposta11 || "Não respondida",
            respostaCorreta: gabarito.pergunta11.resposta.join(" ou "),
            acertou: acertou11
        });

        return { pontos, totalPerguntas: 11, resultados };
    }

    // Botão de Calcular Pontuação Geral
    const btnCalcular = document.getElementById("btn-calcular");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", function () {
            const { pontos, totalPerguntas, resultados } = gerarRelatorioDetalhado();
            const resDiv = document.getElementById("resultado-quiz");
            
            if (resDiv) {
                resDiv.style.display = "block";
                
                // Calcular porcentagem
                const porcentagem = ((pontos / totalPerguntas) * 100).toFixed(1);
                
                // Criar HTML do relatório
                let htmlRelatorio = `
                    <div class="relatorio-container">
                        <h3>📊 Relatório Detalhado do Seu Quiz</h3>
                        <div class="resumo-score">
                            <p class="score-text">Você acertou <strong>${pontos} de ${totalPerguntas}</strong> perguntas</p>
                            <p class="porcentagem-text">Desempenho: <strong>${porcentagem}%</strong></p>
                        </div>
                        
                        <div class="relatorio-perguntas">
                `;

                // Adicionar cada resultado
                resultados.forEach(resultado => {
                    const iconStatus = resultado.acertou ? '✅' : '❌';
                    const classStatus = resultado.acertou ? 'correto' : 'incorreto';
                    
                    htmlRelatorio += `
                        <div class="item-relatorio ${classStatus}">
                            <div class="numero-pergunta">${iconStatus} Pergunta ${resultado.numero}</div>
                            <div class="pergunta-texto"><strong>${resultado.pergunta}</strong></div>
                            <div class="resposta-info">
                                <p><strong>Sua resposta:</strong> <span class="sua-resposta">${resultado.respostaSelecionada}</span></p>
                                ${!resultado.acertou ? `<p><strong>Resposta correta:</strong> <span class="resposta-certa">${resultado.respostaCorreta}</span></p>` : ''}
                            </div>
                        </div>
                    `;
                });

                htmlRelatorio += `
                        </div>
                    </div>
                `;

                resDiv.innerHTML = htmlRelatorio;
            }
        });
    }
});