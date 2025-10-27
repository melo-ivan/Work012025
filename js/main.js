// main.js - máscaras simples, validação nativa e melhorias de acessibilidade
document.addEventListener('DOMContentLoaded', function(){
  // set year
  const y = new Date().getFullYear();
  const y1 = document.getElementById('year');
  const y2 = document.getElementById('year2');
  if(y1) y1.textContent = y;
  if(y2) y2.textContent = y;

  // masks: CPF, telefone, CEP
  function setMask(el, maskFn){
    el.addEventListener('input', function(e){
      const pos = el.selectionStart;
      el.value = maskFn(el.value);
      el.setSelectionRange(el.value.length, el.value.length);
    });
  }
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('telefone');
  const cep = document.getElementById('cep');

  function maskCPF(v){
    v = v.replace(/\D/g,'').slice(0,11);
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
            .replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3')
            .replace(/(\d{3})(\d{3})/, '$1.$2')
            ;
  }
  function maskTel(v){
    v = v.replace(/\D/g,'').slice(0,11);
    if(v.length <= 10){
      return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/,'');
    } else {
      return v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  }
  function maskCEP(v){
    v = v.replace(/\D/g,'').slice(0,8);
    return v.replace(/(\d{5})(\d{0,3})/, '$1-$2').replace(/-$/,'');
  }
  if(cpf) setMask(cpf, maskCPF);
  if(tel) setMask(tel, maskTel);
  if(cep) setMask(cep, maskCEP);

  // basic form handling
  const form = document.getElementById('cadForm');
  const msg = document.getElementById('msg');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        msg.textContent = 'Existem campos inválidos. Corrija e tente novamente.';
        return;
      }
      // Simular envio (não real): mostrar resumo acessível
      const data = new FormData(form);
      const resumo = {};
      for(const [k,v] of data.entries()) resumo[k]=v;
      msg.textContent = 'Cadastro enviado com sucesso. Obrigado!';
      // limpar depois de 2s (simulação)
      setTimeout(()=>{ form.reset(); }, 2000);
      console.log('Simulação de envio:', resumo);
    });
  }
});
