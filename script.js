function processarArquivo() {
  const input = document.getElementById("arquivoEntrada");
  const file = input.files[0];

  if (!file) {
    alert("Selecione um arquivo primeiro.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const conteudo = e.target.result;
    const linhas = conteudo.split(/\r?\n/).slice(4); // Remove as 4 primeiras linhas

    const novasLinhas = linhas.map(linha => {
      const partes = linha.split("\t");
      return partes.length > 5 ? partes.slice(2).join("\t") : null;
    }).filter(l => l !== null);

    const resultado = novasLinhas.join("\n");
    const blob = new Blob([resultado], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.getElementById("downloadLink");
    link.href = url;
    link.style.display = "inline-block";
    document.getElementById("mensagem").innerText = "Arquivo processado com sucesso!";
  };

  reader.readAsText(file);
}
