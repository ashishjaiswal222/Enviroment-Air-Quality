import * as tf from "@tensorflow/tfjs";

export const predictAQI = async (data) => {
  const input = tf.tensor2d(
    data.map((d) => [d.mq135?.integerValue || 0, d.temperature?.doubleValue || 0]),
    [data.length, 2]
  );
  const output = tf.tensor2d(data.map((d) => [d.mq135?.integerValue || 0]), [data.length, 1]);

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 10, inputShape: [2], activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  await model.fit(input, output, { epochs: 50 });
  const predictions = model.predict(input).dataSync();

  return Array.from(predictions);
};