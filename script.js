// Registrar o service worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar o ServiceWorker:', error);
      });
  });
}

// Função para adicionar mais gabinetes
function adicionarGabinete() {
    const gabinetesContainer = document.getElementById('gabinetesContainer');
    const numeroGabinetes = gabinetesContainer.getElementsByClassName('gabinete').length + 1;

    const gabineteDiv = document.createElement('div');
    gabineteDiv.className = 'gabinete';
    gabineteDiv.id = `gabineteDiv${numeroGabinetes}`;
    gabineteDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <label for="gabinete${numeroGabinetes}">INFORMAR GABINETE - ${numeroGabinetes}:</label>
            <button type="button" class="btn btn-danger btn-sm" onclick="removerGabinete(${numeroGabinetes})">
                Remover
            </button>
        </div>
        <div class="form-group">
            <select id="gabinete${numeroGabinetes}" class="form-control">
                <option value="">Selecione...</option>
                <option value="DELTA">DELTA</option>
                <option value="DELTA ORION">DELTA ORION</option>
                <option value="DELTA TX">DELTA TX</option>
                <option value="ELTEK">ELTEK</option>
                <option value="ELTEK FULL TX">ELTEK FULL TX</option>
                <option value="EMERSON">EMERSON</option>
                <option value="EMERSON TX">EMERSON TX</option>
                <option value="PHB">PHB</option>
            </select>
        </div>
        <div class="form-group">
            <label for="retificadores${numeroGabinetes}">QUANTIDADE DE RETIFICADORES NO GABINETE ${numeroGabinetes}-FCC:</label>
            <input type="number" id="retificadores${numeroGabinetes}" class="form-control">
        </div>
        <div class="form-group">
            <label for="siteBateria${numeroGabinetes}">SITE COM BATERIA:</label>
            <select id="siteBateria${numeroGabinetes}" class="form-control" onchange="mostrarBateriaInfo(${numeroGabinetes})">
                <option value="">Selecione...</option>
                <option value="SIM">SIM</option>
                <option value="NAO">NÃO</option>
            </select>
        </div>
        <div class="bateria-info" id="bateriaInfo${numeroGabinetes}" style="display: none;">
            <div class="form-group">
                <label for="baterias${numeroGabinetes}">QUANTIDADE DE BATERIAS NO GABINETE-FCC ${numeroGabinetes}:</label>
                <input type="number" id="baterias${numeroGabinetes}" class="form-control">
            </div>
            <div class="form-group">
                <label for="infoBateria${numeroGabinetes}">INFORMAÇÕES DA BATERIA:</label>
                <select id="infoBateria${numeroGabinetes}" class="form-control">
                    <option value="">Selecione...</option>
                    <option value="EP TELECOM">EP TELECOM</option>
                    <option value="HUAWEI">HUAWEI</option>
                    <option value="MOURA">MOURA</option>
                    <option value="NEWMAX">NEWMAX</option>
                    <option value="UNIPOWER">UNIPOWER</option>
                    <option value="ZTE">ZTE</option>
                </select>
            </div>
            <div class="form-group">
                <label for="quantidadeBancos${numeroGabinetes}">QUANTIDADE DE BANCOS:</label>
                <input type="number" id="quantidadeBancos${numeroGabinetes}" class="form-control">
            </div>
            <div class="form-group">
                <label for="capacidade${numeroGabinetes}">CAPACIDADE:</label>
                <input type="text" id="capacidade${numeroGabinetes}" class="form-control">
            </div>
            <div class="form-group">
                <label for="volts${numeroGabinetes}">VOLTS:</label>
                <select id="volts${numeroGabinetes}" class="form-control">
                    <option value="">Selecione...</option>
                    <option value="2 V">2 V</option>
                    <option value="12 V">12 V</option>
                    <option value="24 V">24 V</option>
                    <option value="48 V">48 V</option>
                </select>
            </div>
            <div class="form-group">
                <label for="elemento${numeroGabinetes}">ELEMENTO:</label>
                <input type="number" id="elemento${numeroGabinetes}" class="form-control">
            </div>
            <div class="form-group">
                <label for="consumoFonte${numeroGabinetes}">CONSUMO FONTE:</label>
                <input type="number" id="consumoFonte${numeroGabinetes}" class="form-control">
            </div>
            <div class="form-group">
                <label for="autonomia${numeroGabinetes}">AUTONOMIA:</label>
                <select id="autonomia${numeroGabinetes}" class="form-control" onchange="mostrarTempoAutonomia(${numeroGabinetes})">
                    <option value="">Selecione...</option>
                    <option value="SIM">SIM</option>
                    <option value="NAO">NÃO</option>
                </select>
            </div>
            <div class="form-group" id="tempoAutonomiaGroup${numeroGabinetes}" style="display: none;">
                <label for="tempoAutonomia${numeroGabinetes}">TEMPO DE AUTONOMIA:</label>
                <input type="text" id="tempoAutonomia${numeroGabinetes}" class="form-control">
            </div>
        </div>
    `;
    gabinetesContainer.appendChild(gabineteDiv);
}

// Função para remover um gabinete
function removerGabinete(numeroGabinete) {
    const gabineteDiv = document.getElementById(`gabineteDiv${numeroGabinete}`);
    if (gabineteDiv) {
        gabineteDiv.remove();
        // Reordenar os IDs dos gabinetes restantes
        const gabinetes = document.getElementsByClassName('gabinete');
        for (let i = 0; i < gabinetes.length; i++) {
            const novoNumero = i + 1;
            gabinetes[i].id = `gabineteDiv${novoNumero}`;
            atualizarIdsGabinete(gabinetes[i], novoNumero);
        }
    }
}

// Função auxiliar para atualizar IDs dentro do gabinete
function atualizarIdsGabinete(gabineteDiv, novoNumero) {
    const elementos = gabineteDiv.querySelectorAll('[id]');
    elementos.forEach(elemento => {
        const idAtual = elemento.id;
        elemento.id = idAtual.replace(/\d+/, novoNumero);
    });
    
    // Atualizar labels
    const labels = gabineteDiv.querySelectorAll('label');
    labels.forEach(label => {
        label.textContent = label.textContent.replace(/\d+/, novoNumero);
        if (label.getAttribute('for')) {
            label.setAttribute('for', label.getAttribute('for').replace(/\d+/, novoNumero));
        }
    });
}

// Função para mostrar ou esconder informações da bateria
function mostrarBateriaInfo(numeroGabinete) {
    const siteBateria = document.getElementById(`siteBateria${numeroGabinete}`);
    const bateriaInfo = document.getElementById(`bateriaInfo${numeroGabinete}`);
    if (siteBateria && bateriaInfo) {
        bateriaInfo.style.display = siteBateria.value === 'SIM' ? 'block' : 'none';
    }
}

// Função para mostrar ou esconder o tempo de autonomia
function mostrarTempoAutonomia(numeroGabinete) {
    const autonomia = document.getElementById(`autonomia${numeroGabinete}`);
    const tempoAutonomiaGroup = document.getElementById(`tempoAutonomiaGroup${numeroGabinete}`);
    if (autonomia && tempoAutonomiaGroup) {
        tempoAutonomiaGroup.style.display = autonomia.value === 'SIM' ? 'block' : 'none';
    }
}

// Função para mostrar ou esconder o modelo do cadeado da entrada do site
function mostrarModeloCadeadoEntrada() {
    const cadeadoEntrada = document.getElementById('cadeado');
    const modeloCadeadoEntradaGroup = document.getElementById('modeloCadeadoEntradaGroup');
    if (cadeadoEntrada && modeloCadeadoEntradaGroup) {
        modeloCadeadoEntradaGroup.style.display = cadeadoEntrada.value === 'SIM' ? 'block' : 'none';
    }
}

// Função para mostrar ou esconder o modelo do cadeado do gradil
function mostrarModeloCadeadoGradil() {
    const gradilCadeado = document.getElementById('gradilCadeado');
    const modeloCadeadoGradilGroup = document.getElementById('modeloCadeadoGradilGroup');
    if (gradilCadeado && modeloCadeadoGradilGroup) {
        modeloCadeadoGradilGroup.style.display = gradilCadeado.value === 'SIM' ? 'block' : 'none';
    }
}

// Função para mostrar ou esconder o campo portaGabinete
function mostrarPortaGabinete() {
    const estadoPortas = document.getElementById('estadoPortas');
    const portaGabineteGroup = document.getElementById('portaGabinete-group');
    if (estadoPortas && portaGabineteGroup) {
        portaGabineteGroup.style.display = estadoPortas.value === 'PRECISA DE MANUTENÇÃO' ? 'block' : 'none';
    }
}

// Função para gerar o relatório
function gerarRelatorio() {
    try {
        const relatorio = {
            site: document.getElementById('site')?.value?.toUpperCase() || '',
            ami: document.getElementById('ami')?.value?.toUpperCase() || '',
            tecnico: document.getElementById('tecnico')?.value?.toUpperCase() || '',
            supervisor: document.getElementById('supervisor')?.value?.toUpperCase() || '',
            coordenador: document.getElementById('coordenador')?.value?.toUpperCase() || '',
            dataAcionamento: document.getElementById('dataAcionamento')?.value || '',
            dataDeslocamento: document.getElementById('dataDeslocamento')?.value || '',
            dataEntradaSite: document.getElementById('dataEntradaSite')?.value || '',
            dataSaidaSite: document.getElementById('dataSaidaSite')?.value || '',
            dataFimDeslocamento: document.getElementById('dataFimDeslocamento')?.value || '',
            quemAcionou: document.getElementById('quemAcionou')?.value?.toUpperCase() || '',
            cadeado: document.getElementById('cadeado')?.value?.toUpperCase() || '',
            modeloCadeadoEntrada: document.getElementById('modeloCadeadoEntrada')?.value?.toUpperCase() || '',
            gradilCadeado: document.getElementById('gradilCadeado')?.value?.toUpperCase() || '',
            modeloCadeadoGradil: document.getElementById('modeloCadeadoGradil')?.value?.toUpperCase() || '',
            vandalizado: document.getElementById('vandalizado')?.value?.toUpperCase() || '',
            siteGPON: document.getElementById('siteGPON')?.value?.toUpperCase() || '',
            zeladoria: document.getElementById('zeladoria')?.value?.toUpperCase() || '',
            estadoPortas: document.getElementById('estadoPortas')?.value?.toUpperCase() || '',
            portaGabinete: document.getElementById('portaGabinete')?.value?.toUpperCase() || '',
            posteInterno: document.getElementById('posteInterno')?.value?.toUpperCase() || '',
            iluminacao: document.getElementById('iluminacao')?.value?.toUpperCase() || '',
            falhasAtividade: Array.from(document.getElementById('falhaAtividade').selectedOptions).map(option => option.value?.toUpperCase()).join(', ') || '',
            causaEncontrada: document.getElementById('causaEncontrada')?.value?.toUpperCase() || '',
            acaoRealizada: document.getElementById('acaoRealizada')?.value?.toUpperCase() || '',
            pendencias: document.getElementById('pendencias')?.value?.toUpperCase() || '',
            amiPendencia: document.getElementById('amiPendencia')?.value?.toUpperCase() || '',
            testadoCom: document.getElementById('testadoCom')?.value?.toUpperCase() || '',
            obs: document.getElementById('obs')?.value?.toUpperCase() || '',
            gabinetes: []
        };

        // Coleta informações dos gabinetes
        const gabinetes = document.getElementsByClassName('gabinete');
        for (let i = 0; i < gabinetes.length; i++) {
            const numeroGabinete = i + 1;
            const siteBateriaValue = document.getElementById(`siteBateria${numeroGabinete}`)?.value;
            const autonomiaValue = document.getElementById(`autonomia${numeroGabinete}`)?.value;

            const gabinete = {
                tipo: document.getElementById(`gabinete${numeroGabinete}`)?.value?.toUpperCase() || '',
                retificadores: document.getElementById(`retificadores${numeroGabinete}`)?.value || '',
                siteBateria: siteBateriaValue?.toUpperCase() || '',
                baterias: siteBateriaValue === 'SIM' ? document.getElementById(`baterias${numeroGabinete}`)?.value || '' : null,
                infoBateria: siteBateriaValue === 'SIM' ? document.getElementById(`infoBateria${numeroGabinete}`)?.value?.toUpperCase() || '' : null,
                quantidadeBancos: siteBateriaValue === 'SIM' ? document.getElementById(`quantidadeBancos${numeroGabinete}`)?.value || '' : null,
                capacidade: siteBateriaValue === 'SIM' ? document.getElementById(`capacidade${numeroGabinete}`)?.value?.toUpperCase() || '' : null,
                volts: siteBateriaValue === 'SIM' ? document.getElementById(`volts${numeroGabinete}`)?.value?.toUpperCase() || '' : null,
                elemento: siteBateriaValue === 'SIM' ? document.getElementById(`elemento${numeroGabinete}`)?.value || '' : null,
                consumoFonte: siteBateriaValue === 'SIM' ? document.getElementById(`consumoFonte${numeroGabinete}`)?.value || '' : null,
                autonomia: siteBateriaValue === 'SIM' ? autonomiaValue?.toUpperCase() || '' : null,
                tempoAutonomia: autonomiaValue === 'SIM' ? document.getElementById(`tempoAutonomia${numeroGabinete}`)?.value?.toUpperCase() || '' : null
            };
            relatorio.gabinetes.push(gabinete);
        }

        // Função para formatar data e hora
        function formatarDataHora(data) {
            if (!data) return '';
            try {
                const d = new Date(data);
                if (isNaN(d.getTime())) return '';
                const dia = String(d.getDate()).padStart(2, '0');
                const mes = String(d.getMonth() + 1).padStart(2, '0');
                const ano = String(d.getFullYear()).slice(-2);
                const hora = String(d.getHours()).padStart(2, '0');
                const minuto = String(d.getMinutes()).padStart(2, '0');
                return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
            } catch (e) {
                console.error('Erro ao formatar data:', e);
                return '';
            }
        }

        // Formatando as datas do relatório
        relatorio.dataAcionamento = formatarDataHora(relatorio.dataAcionamento);
        relatorio.dataDeslocamento = formatarDataHora(relatorio.dataDeslocamento);
        relatorio.dataEntradaSite = formatarDataHora(relatorio.dataEntradaSite);
        relatorio.dataSaidaSite = formatarDataHora(relatorio.dataSaidaSite);
        relatorio.dataFimDeslocamento = formatarDataHora(relatorio.dataFimDeslocamento);

        let resultado = `
                                *INFORME DE ATENDIMENTO TÉCNICO*

*SITE:* ${relatorio.site}
*AMI:* ${relatorio.ami}
*NOME DO TÉCNICO:* ${relatorio.tecnico}
*NOME DO SUPERVISOR:* ${relatorio.supervisor}
*COORDENADOR:* ${relatorio.coordenador}
*DATA ACIONAMENTO:* ${relatorio.dataAcionamento}
*DATA HORA DESLOCAMENTO:* ${relatorio.dataDeslocamento}
*DATA HORA ENTRADA SITE:* ${relatorio.dataEntradaSite}
*DATA HORA SAÍDA SITE:* ${relatorio.dataSaidaSite}
*DATA HORA FIM DESLOCAMENTO:* ${relatorio.dataFimDeslocamento}
*QUEM ACIONOU:* ${relatorio.quemAcionou}
*ENTRADA SITE POSSUI CADEADO:* ${relatorio.cadeado}
${relatorio.cadeado === 'SIM' ? `*MODELO DO CADEADO ENTRADA SITE:* ${relatorio.modeloCadeadoEntrada}` : ''}
*GRADIL POSSUI CADEADO:* ${relatorio.gradilCadeado}
${relatorio.gradilCadeado === 'SIM' ? `*MODELO DO CADEADO GRADIL:* ${relatorio.modeloCadeadoGradil}` : ''}
*SITE VANDALIZADO:* ${relatorio.vandalizado}
`;

        relatorio.gabinetes.forEach((gabinete, index) => {
            resultado += `
*GABINETE ${index + 1}:* ${gabinete.tipo}
*QUANTIDADE DE RETIFICADORES NO GABINETE ${index + 1}-FCC:* ${gabinete.retificadores}
*SITE COM BATERIA:* ${gabinete.siteBateria}
${gabinete.siteBateria === 'SIM'
                ? `
*QUANTIDADE DE BATERIAS NO GABINETE-FCC ${index + 1}:* ${gabinete.baterias}
*INFORMAÇÕES DA BATERIA:* ${gabinete.infoBateria}
*QUANTIDADE DE BANCOS:* ${gabinete.quantidadeBancos}
*CAPACIDADE:* ${gabinete.capacidade}
*VOLTS:* ${gabinete.volts}
*ELEMENTO:* ${gabinete.elemento}
*CONSUMO FONTE:* ${gabinete.consumoFonte}
*AUTONOMIA:* ${gabinete.autonomia}
${gabinete.autonomia === 'SIM' ? `*TEMPO DE AUTONOMIA:* ${gabinete.tempoAutonomia}` : '*SITE SEM AUTONOMIA*'}`
                : '*SITE SEM AUTONOMIA*'}
`;
        });

        resultado += `
*SITE POSSUI REDE GPON:* ${relatorio.siteGPON}
*NECESSÁRIO ZELADORIA:* ${relatorio.zeladoria}
*ESTADO DAS PORTAS DOS GABINETES:* ${relatorio.estadoPortas}
${relatorio.estadoPortas === 'PRECISA DE MANUTENÇÃO' ? `*INFORMAR A PORTA DE QUAL GABINETE:* ${relatorio.portaGabinete}` : ''}
*EXISTÊNCIA POSTE INTERNO:* ${relatorio.posteInterno}
*EXISTÊNCIA ILUMINAÇÃO INTERNA-EXTERNA:* ${relatorio.iluminacao}
*FALHAS DA ATIVIDADE:* ${relatorio.falhasAtividade}
*CAUSA ENCONTRADA:* ${relatorio.causaEncontrada}
*AÇÃO REALIZADA:* ${relatorio.acaoRealizada}
*PENDÊNCIAS:* ${relatorio.pendencias}
*AMI DA PENDÊNCIA:* ${relatorio.amiPendencia}
*TESTADO COM:* ${relatorio.testadoCom}
*OBSERVAÇÕES:* ${relatorio.obs}`;

        // Remover linhas vazias e espaços extras
        resultado = resultado.split('\n')
            .filter(linha => linha.trim() !== '')
            .join('\n')
            .replace(/\n{3,}/g, '\n\n');

        document.getElementById('resultado').textContent = resultado.trim();
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        alert('Ocorreu um erro ao gerar o relatório. Por favor, verifique os dados inseridos.');
    }
}

// Função para enviar o relatório via WhatsApp
function enviarRelatorio() {
    const resultado = document.getElementById('resultado')?.textContent;
    if (resultado) {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(resultado)}`;
        window.open(whatsappUrl, '_blank');
    } else {
        alert('Por favor, gere o relatório primeiro.');
    }
}

// Função para inicializar o formulário
function inicializarFormulario() {
    // Adicionar listeners para os campos que controlam visibilidade
    const cadeado = document.getElementById('cadeado');
    const gradilCadeado = document.getElementById('gradilCadeado');
    const estadoPortas = document.getElementById('estadoPortas');
    
    if (cadeado) cadeado.addEventListener('change', mostrarModeloCadeadoEntrada);
    if (gradilCadeado) gradilCadeado.addEventListener('change', mostrarModeloCadeadoGradil);
    if (estadoPortas) {
        estadoPortas.addEventListener('change', mostrarPortaGabinete);
        estadoPortas.value = ""; // Define o valor inicial do select
        mostrarPortaGabinete();
    }

    // Adicionar listener para o botão de adicionar gabinete
    const adicionarGabineteBtn = document.getElementById('adicionarGabineteBtn');
    if (adicionarGabineteBtn) {
        adicionarGabineteBtn.addEventListener('click', adicionarGabinete);
    }
}

// Inicializar o formulário quando a página carregar
window.addEventListener('load', inicializarFormulario);

// Função para gerar mensagem de entrada
function gerarEntrada() {
    try {
        const falhasAtividade = Array.from(document.getElementById('falhaAtividade').selectedOptions)
            .map(option => option.value)
            .join(', ');

        const entrada = `*ENTRADA: (X)*
*EMPRESA: STTE*
*SITE:* ${document.getElementById('site')?.value?.toUpperCase() || ''}
*AMI:* ${document.getElementById('ami')?.value?.toUpperCase() || ''}
*FALHA DA ATIVIDADE:* ${falhasAtividade}
*TÉCNICO:* ${document.getElementById('tecnico')?.value?.toUpperCase() || ''}
*SUPERVISOR:* ${document.getElementById('supervisor')?.value?.toUpperCase() || ''}
*COORDENADOR:* ${document.getElementById('coordenador')?.value?.toUpperCase() || ''}
*DATA HORA ENTRADA:* ${formatarDataHora(document.getElementById('dataEntradaSite')?.value || '')}`;

        document.getElementById('resultado').textContent = entrada.trim();
    } catch (error) {
        console.error('Erro ao gerar entrada:', error);
        alert('Ocorreu um erro ao gerar a entrada. Por favor, verifique os dados inseridos.');
    }
}

// Função para gerar mensagem de saída
function gerarSaida() {
    try {
        const falhasAtividade = Array.from(document.getElementById('falhaAtividade').selectedOptions)
            .map(option => option.value)
            .join(', ');

        const saida = `*SAÍDA:* (X)
*EMPRESA: STTE*
*SITE:* ${document.getElementById('site')?.value?.toUpperCase() || ''}
*AMI:* ${document.getElementById('ami')?.value?.toUpperCase() || ''}
*FALHA DA ATIVIDADE:* ${falhasAtividade}
*TÉCNICO:* ${document.getElementById('tecnico')?.value?.toUpperCase() || ''}
*SUPERVISOR:* ${document.getElementById('supervisor')?.value?.toUpperCase() || ''}
*COORDENADOR:* ${document.getElementById('coordenador')?.value?.toUpperCase() || ''}
*DATA HORA SAÍDA:* ${formatarDataHora(document.getElementById('dataSaidaSite')?.value || '')}`;

        document.getElementById('resultado').textContent = saida.trim();
    } catch (error) {
        console.error('Erro ao gerar saída:', error);
        alert('Ocorreu um erro ao gerar a saída. Por favor, verifique os dados inseridos.');
    }
}

// Função auxiliar para formatar data e hora
function formatarDataHora(dataHora) {
    if (!dataHora) return '';
    const data = new Date(dataHora);
    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Função para gerar novo relatório
function gerarNovoRelatorio() {
    try {
        const falhasAtividade = Array.from(document.getElementById('falhaAtividade').selectedOptions)
            .map(option => option.value)
            .join(', ');

        const relatorio = `*INFORME DE ATENDIMENTO TÉCNICO*
*SITE:* ${document.getElementById('site')?.value?.toUpperCase() || ''}
*AMI:* ${document.getElementById('ami')?.value?.toUpperCase() || ''}
*NOME DO TÉCNICO:* ${document.getElementById('tecnico')?.value?.toUpperCase() || ''}
*NOME DO SUPERVISOR:* ${document.getElementById('supervisor')?.value?.toUpperCase() || ''}
*COORDENADOR:* ${document.getElementById('coordenador')?.value?.toUpperCase() || ''}
*DATA ACIONAMENTO:* ${formatarDataHora(document.getElementById('dataAcionamento')?.value || '')}
*DATA HORA DESLOCAMENTO:* ${formatarDataHora(document.getElementById('dataDeslocamento')?.value || '')}
*DATA HORA FIM DESLOCAMENTO:* ${formatarDataHora(document.getElementById('dataFimDeslocamento')?.value || '')}
*QUEM ACIONOU:* ${document.getElementById('quemAcionou')?.value?.toUpperCase() || ''}
*FALHA DA ATIVIDADE:* ${falhasAtividade}
*AÇÃO REALIZADA:* ${document.getElementById('acaoRealizada')?.value?.toUpperCase() || ''}`;

        document.getElementById('resultado').textContent = relatorio.trim();
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        alert('Ocorreu um erro ao gerar o relatório. Por favor, verifique os dados inseridos.');
    }
}

// Adicionar suporte para instalação PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Previne o prompt automático
  e.preventDefault();
  // Guarda o evento para usar depois
  deferredPrompt = e;
  // Atualiza UI para mostrar botão de instalação
  if (document.getElementById('installBtn')) {
    document.getElementById('installBtn').style.display = 'block';
  }
});

// Função para instalar PWA
async function installPWA() {
  if (deferredPrompt) {
    // Mostra o prompt de instalação
    deferredPrompt.prompt();
    // Espera o usuário responder
    const { outcome } = await deferredPrompt.userChoice;
    // Limpa o prompt salvo
    deferredPrompt = null;
    // Esconde o botão de instalação
    if (document.getElementById('installBtn')) {
      document.getElementById('installBtn').style.display = 'none';
    }
  }
}

// Detectar quando o app é instalado
window.addEventListener('appinstalled', () => {
  // Limpa o prompt salvo
  deferredPrompt = null;
  // Esconde o botão de instalação
  if (document.getElementById('installBtn')) {
    document.getElementById('installBtn').style.display = 'none';
  }
});
