const localStorageAlert = () => {
    if (typeof Storage !== "undefined") {
        localStorage.setItem("tempTitle", "");
        localStorage.setItem("tempContent", "");
      } else {
        alert(
          "Warning: Your browser do not support localStorage. If you do not update or change the browser you may face some bugs and performance issues!"
        );
      }
};

export { localStorageAlert };

