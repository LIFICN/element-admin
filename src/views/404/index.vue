<template>
  <div class="error-screen">
    <div class="container-fluid">
      <div class="content-detail">
        <h1>404</h1>
        <div class="back-btn">
          <a href="/">Back to Home</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
$color: rgb(#1890ff, 0.95);
.error-screen {
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .container-fluid {
    text-align: center;
  }

  h1 {
    background: #fff;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    font-size: 100px;
    font-weight: 700;
    flex-flow: row wrap;
    align-content: center;
    justify-content: center;
    letter-spacing: 5px;
    color: #666;
  }

  .back-btn {
    margin-top: 30px;

    a {
      padding: 8px 15px;
      color: #fff;
      border-radius: 30px;
      font-size: 14px;
      background: $color;
      box-shadow: 0px 5px 10px $color;
      text-decoration: none;
    }
  }
}
</style>
