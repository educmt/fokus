# ⏱️ Focus Timer (Pomodoro)

Aplicação web inspirada no **método Pomodoro**, criada para ajudar usuários a manter o foco durante períodos de estudo ou trabalho, alternando automaticamente entre momentos de concentração e descanso.

O projeto permite iniciar, pausar e acompanhar um temporizador que alterna entre **foco, descanso curto e descanso longo**, incentivando uma rotina de produtividade mais saudável.

---

## 📌 Sobre o Método Pomodoro

O **Método Pomodoro** é uma técnica de gerenciamento de tempo que divide o trabalho em ciclos:

- 25 minutos de foco
- 5 minutos de descanso curto
- A cada 4 ciclos, um descanso longo (15 minutos)

Essa estratégia ajuda a:

- manter a concentração
- evitar fadiga mental
- aumentar a produtividade

---

## 🚀 Funcionalidades

- ⏳ Temporizador de foco (25 minutos)
- ☕ Descanso curto (5 minutos)
- 🌴 Descanso longo (15 minutos)
- ▶️ Iniciar e pausar o temporizador
- 🔔 Sons para início, pausa e término do ciclo
- 🎵 Música ambiente opcional
- 🔄 Troca automática entre foco e descanso
- 🎨 Interface dinâmica que muda conforme o contexto
- 📝 Criação, edição e seleção de tarefas
- ✅ Marcação de tarefas como concluídas ao final do ciclo
- 🗑️ Remoção de tarefas (concluídas ou todas)
- 💾 Persistência de dados no navegador

---

## 🛠️ Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**

Principais conceitos aplicados:

- Manipulação do **DOM**  
- **Eventos** em JavaScript (click, submit, custom events)  
- Uso de **LocalStorage** para persistência de dados  
- Serialização de dados com **JSON (`JSON.stringify` / `JSON.parse`)**  
- Criação dinâmica de elementos com `createElement`  
- Atualização de interface em tempo real  
- Controle de estado da aplicação (tarefas selecionadas e concluídas)  
- Uso de **eventos customizados** (`FocoFinalizado`)  
- Manipulação de classes CSS (`classList`)  
- Organização da lógica em funções reutilizáveis  

---

## 🧠 Lógica da funcionalidade de tarefas

O sistema de tarefas funciona como um complemento ao timer Pomodoro, permitindo que o usuário organize suas atividades enquanto mantém o foco.

### Principais comportamentos:

- As tarefas são armazenadas no **LocalStorage**, garantindo persistência mesmo após recarregar a página  
- Cada tarefa é representada como um objeto JavaScript contendo:
  - `descricao`
  - `completa` (status de conclusão)  
- A interface é construída dinamicamente com base nesses dados  

### Funcionalidades implementadas:

- **Criação de tarefas** via formulário  
- **Edição de tarefas** com prompt dinâmico  
- **Seleção de tarefa ativa**, exibindo sua descrição  
- **Conclusão automática de tarefas** ao finalizar um ciclo de foco  
- **Desativação da edição** após conclusão  
- **Remoção inteligente**:
  - apenas tarefas concluídas  
  - ou todas as tarefas  

### Integração com o Timer:

Ao disparar o evento customizado `FocoFinalizado`:

- A tarefa selecionada é marcada como concluída  
- A interface é atualizada visualmente  
- O estado é salvo automaticamente  

Isso conecta diretamente **produtividade (timer)** com **organização (tarefas)**.

---

## 📷 Demonstração
Endereço do site: https://educmt.github.io/fokus/
<div align= "center">
  <img width="412" height="272" alt="image" src="https://github.com/user-attachments/assets/a301028e-c9af-48a6-b744-85f435b6cc77" />
  <img width="412" height="272" alt="image" src="https://github.com/user-attachments/assets/f3df5219-836d-4ce1-8385-95be2448d581" />
  <img width="412" height="272" alt="image" src="https://github.com/user-attachments/assets/beb2d241-120c-4990-b1f8-816f5fc00ef2" />
</div>

---
## 📚 Créditos
Projeto desenvolvido com base em aulas da plataforma Alura. Toda a estrutura html e css veio pronta, projeto teve como objetivo o estudo do JavaScript para a manipulação do **DOM**
