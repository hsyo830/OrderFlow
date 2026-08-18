import clsx from "clsx";
import type { SVGProps } from "react";

type MusicalIconProps = SVGProps<SVGSVGElement>;

export default function MusicalIcon({ className, ...props }: MusicalIconProps) {
  return (
    <svg
      viewBox="0 0 276 260"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="none"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      {/* 뒤쪽 웃는 가면 */}
      <path
        d="M61 47
           C61 42 66 40 72 42
           C96 49 123 47 145 39
           C153 36 159 32 164 29
           C169 26 173 29 176 35
           C187 57 190 83 185 106
           C180 130 168 151 150 163
           C139 170 126 173 114 168
           C91 159 75 141 66 119
           C58 99 56 75 61 47Z"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 뒤쪽 가면 왼쪽 눈 */}
      <path
        d="M85 84C92 76 103 75 110 81"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
      />

      {/* 뒤쪽 가면 오른쪽 눈 */}
      <path
        d="M135 78C142 69 153 68 160 74"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
      />

      {/* 뒤쪽 웃는 입 */}
      <path
        d="M97 121
           C108 129 123 132 138 128
           C135 140 126 147 116 145
           C106 143 100 134 97 121Z"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 앞쪽 슬픈 가면 */}
      <path
        d="M156 91
           C158 86 163 85 168 89
           C187 102 209 108 232 109
           C238 109 243 108 248 106
           C253 104 257 108 257 114
           C260 139 255 165 245 185
           C235 205 220 219 200 226
           C188 230 176 226 166 219
           C146 205 135 184 132 160
           C130 137 138 111 148 96
           C151 92 153 90 156 91Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 앞쪽 가면 왼쪽 눈 */}
      <path
        d="M158 127C164 134 175 136 182 130"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
      />

      {/* 앞쪽 가면 오른쪽 눈 */}
      <path
        d="M204 136C210 143 221 145 228 138"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
      />

      {/* 앞쪽 슬픈 입 */}
      <path
        d="M159 185
           C168 173 181 170 191 174
           C201 178 207 188 205 198
           C195 188 183 184 171 185
           C166 185 162 186 159 185Z"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
