<template>
    <div class="container portal-body">
        <div id="resume-raw-download-container">
            <a id="resume-raw-download" href="/resume.pdf" target="_blank">
                <span>Raw Download</span><i class="material-icons-outlined">picture_as_pdf</i>
            </a>
        </div>
        <iframe src="/resume.pdf#toolbar=0"></iframe>
    </div>
</template>

<script>
export default {
    name: 'Resume'
};
</script>

<style scoped>
iframe {
    width: 100%;
    height: 100vh;
}

#resume-raw-download-container {
    margin-top: 1em;
    margin-bottom: 0.5em;
}

#resume-raw-download {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0000ff;
    text-decoration: none;
    font-style: italic;
}

#resume-raw-download:hover {
    opacity: 60%;
    transition: 0.15s;
    cursor: pointer;
}

#resume-raw-download>span {
    font-size: 14px;
    padding-right: 5px;
}
</style>