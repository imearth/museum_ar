using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;
using UnityEngine.UI;
using System;

public class VideoController : MonoBehaviour
{
    //Raw Image to Show Video Images [Assign from the Editor]
    public RawImage image;
    //Video To Play [Assign from the Editor]
    public VideoClip videoToPlay;

    private VideoPlayer videoPlayer;
    private VideoSource videoSource;
    private string url;
    private bool stop = false;
    //Audio
    private AudioSource audioSource;

    // Use this for initialization
    /*
    void Start()
    {
        stop = false;
        Application.runInBackground = false;
        StartCoroutine(playVideo());
    }
    */

    IEnumerator playVideo()
    {
        //Add VideoPlayer to the GameObject
        videoPlayer = gameObject.AddComponent<VideoPlayer>();

        //Add AudioSource
        audioSource = gameObject.AddComponent<AudioSource>();

        //Disable Play on Awake for both Video and Audio
        videoPlayer.playOnAwake = true;
        audioSource.playOnAwake = true;

        //We want to play from video clip not from url
        //videoPlayer.source = VideoSource.VideoClip;
        url = Application.streamingAssetsPath + "/video/" + ImageIdentifier.GameStage.url +".mp4";
        Debug.Log(url);

        //We want to play from url
        videoPlayer.source = VideoSource.Url;
        videoPlayer.url = url;

        //Set Audio Output to AudioSource
        videoPlayer.audioOutputMode = VideoAudioOutputMode.AudioSource;

        //Assign the Audio from Video to AudioSource to be played
        videoPlayer.EnableAudioTrack(0, true);
        videoPlayer.SetTargetAudioSource(0, audioSource);

        //Set video To Play then prepare Audio to prevent Buffering
        //videoPlayer.clip = videoToPlay;
        videoPlayer.Prepare();

        //Wait until video is prepared
        while (!videoPlayer.isPrepared)
        {
            Debug.Log("Preparing Video");
            yield return null;
        }

        Debug.Log("Done Preparing Video");

        //Assign the Texture from Video to RawImage to be displayed
        image.texture = videoPlayer.texture;

        //Play Video
        videoPlayer.Play();
        print("videoPlayer");
        //Play Sound
        audioSource.Play();
        print("audioSource");
        Debug.Log("Playing Video");
        while (videoPlayer.isPlaying)
        {
            if(stop==true)
            { yield break; ; }
            

        }
        /*
        while (videoPlayer.isPlaying)
        {
            print("playing");
            Debug.LogWarning("Video Time: " + Mathf.FloorToInt((float)videoPlayer.time));
            yield return null;

        }
        
        if(!videoPlayer.isPlaying){
            print("isplay stop");
            yield return null;
        }
        */

        Debug.Log("Done Playing Video");
        
    }

    internal void startz()
    {
        stop = false;
        Application.runInBackground = true;
        StartCoroutine("playVideo");
    }

    public void stopVideo()
    {
        videoPlayer.enabled = false;
        stop = true;
        print("stopnow");
    }


}
