import { HTMLProps } from "react";

export default function MinusSVG(props: HTMLProps<HTMLOrSVGElement>) {
  return (
    <svg className={props.className} style={props.style} onClick={props.onClick} viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
  )
}