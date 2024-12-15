import React from "react";
interface BackButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

export default class BackButton extends React.Component<BackButtonProps> {
  render() {
    const { onClick, children } = this.props;

    return (
      <div className="relative pl-4 pr-4 pb-8">
        <button onClick={onClick}>
          <div className={`text-2xl flex items-center text-utfpr_white`}>
            <span className="flex w-full absolute pr-6 pl-6">{children}</span>
          </div>
        </button>
      </div>
    );
  }
}
