<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
    <circle
      :cx="center"
      :cy="center"
      :r="outerRadius"
      fill="none"
      stroke="black"
      stroke-width="2"
    />
    <circle
      :cx="center"
      :cy="center"
      :r="innerRadius"
      fill="none"
      stroke="black"
      stroke-width="2"
    />

    <path :id="topTextPathId" :d="topTextArcPath" fill="none" />
    <path :id="bottomTextPathId" :d="bottomTextArcPath" fill="none" />

    <text :font-size="fontSize" fill="black">
      <textPath
        :href="'#' + topTextPathId"
        startOffset="50%"
        text-anchor="middle"
      >
        <tspan dy="0.3em">{{ topText }}</tspan>
      </textPath>
    </text>

    <text :font-size="fontSize" fill="black">
      <textPath
        :href="'#' + bottomTextPathId"
        startOffset="50%"
        text-anchor="middle"
      >
        <tspan dy="0.3em" rotate="180">{{ reversedBottomText }}</tspan>
      </textPath>
    </text>

    <text
      :x="starLeftX"
      :y="starY"
      :font-size="starSize"
      text-anchor="middle"
      fill="black"
    >
      ★
    </text>
    <text
      :x="starRightX"
      :y="starY"
      :font-size="starSize"
      text-anchor="middle"
      fill="black"
    >
      ★
    </text>
  </svg>
</template>

<script>
export default {
  name: "ZMPSKSSeal",
  props: {
    size: {
      type: Number,
      default: 200,
    },
    topText: {
      type: String,
      default: "ZMPSKS",
    },
    bottomText: {
      type: String,
      default: "UDAIPUR",
    },
    outerRadiusRatio: {
      type: Number,
      default: 0.45,
    },
    innerRadiusRatio: {
      type: Number,
      default: 0.25,
    },
  },
  computed: {
    center() {
      return this.size / 2;
    },
    outerRadius() {
      return this.size * this.outerRadiusRatio;
    },
    innerRadius() {
      return this.size * this.innerRadiusRatio;
    },
    textRadius() {
      return (this.outerRadius + this.innerRadius) / 2;
    },
    fontSize() {
      return (this.outerRadius - this.innerRadius) * 0.6;
    },
    starSize() {
      return this.fontSize * 1.2;
    },
    topTextArcPath() {
      return this.createArcPath(Math.PI, 2 * Math.PI);
    },
    bottomTextArcPath() {
      return this.createArcPath(0, Math.PI);
    },
    starLeftX() {
      return this.center + this.textRadius * Math.cos(Math.PI);
    },
    starRightX() {
      return this.center + this.textRadius * Math.cos(0);
    },
    starY() {
      return this.center;
    },
    topTextPathId() {
      return `topTextPath-${this._uid}`;
    },
    bottomTextPathId() {
      return `bottomTextPath-${this._uid}`;
    },
    reversedBottomText() {
      return this.bottomText.split("").reverse().join("");
    },
  },
  methods: {
    createArcPath(startAngle, endAngle) {
      const startX = this.center + this.textRadius * Math.cos(startAngle);
      const startY = this.center + this.textRadius * Math.sin(startAngle);
      const endX = this.center + this.textRadius * Math.cos(endAngle);
      const endY = this.center + this.textRadius * Math.sin(endAngle);
      const largeArcFlag =
        Math.abs(endAngle - startAngle) <= Math.PI ? "0" : "1";
      return `M ${startX} ${startY} A ${this.textRadius} ${this.textRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
    },
  },
};
</script>
