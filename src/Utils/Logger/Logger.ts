import {injectable} from "inversify";

@injectable()
export class Logger {
  constructor(private window: HTMLElement | null) {
    if (!this.window) {
      alert("Warning: Console window not found!");
      return this;
    }
  }

  public info(message: string) {
    this.sendMessage(message, "darkgrey", "grey");
  }

  public warn(message: string) {
    this.sendMessage(message, "darkorange", "orange");
  }

  public error(message: string) {
    this.sendMessage(message, "darkred", "firebrick");
  }


  private sendMessage(message: string, timestampColor: string, messageColor: string) {
    if (!message || !this.window) {
      return;
    }

    const newNode = this.getNode(timestampColor);
    const messageNode = document.createElement("span");
    messageNode.style.fontWeight = "light";
    messageNode.style.color = messageColor;
    messageNode.appendChild(document.createTextNode(message));

    newNode.appendChild(messageNode);

    this.window.appendChild(newNode);
    this.window.scrollTop = this.window.scrollHeight;
  }

  private getNode(timestampColor: string) {
    let result = document.createElement("div");
    let timestamp = document.createElement("span");
    timestamp.style.fontWeight = 'bold';
    timestamp.style.color = timestampColor;
    let timestampValue = document.createTextNode(`[${new Date().toLocaleTimeString()}]:\t`);
    timestamp.appendChild(timestampValue);

    result.appendChild(timestamp);

    return result;
  }
}
