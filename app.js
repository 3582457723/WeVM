let emulator;

function startVM() {
  const file = document.getElementById("isoInput").files[0];
  const ram = document.getElementById("ram").value * 1024 * 1024;

  document.getElementById("status").innerText = "起動中...";

  if (emulator) emulator.stop();

  let config = {
    wasm_path: "https://copy.sh/v86/build/v86.wasm",
    memory_size: ram,
    vga_memory_size: 8 * 1024 * 1024,
    screen_container: document.getElementById("screen"),
    autostart: true
  };

  if (file) {
    config.cdrom = { buffer: file };
  } else {
    config.hda = {
      url: "https://copy.sh/v86/images/alpine-linux.img"
    };
  }

  emulator = new V86(config);

  setTimeout(() => {
    document.getElementById("status").innerText = "稼働中";
  }, 3000);
}

function stopVM() {
  if (emulator) {
    emulator.stop();
    document.getElementById("status").innerText = "停止しました";
  }
}
